package algorithm

import(
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"encoding/json"
	"strings"
	"time"

	"dailydoseofalgo/database"
	"dailydoseofalgo/models/Algorithms"
)

func ThrowAlgos(c *gin.Context){
	algoords:=c.Param("algoords");
	query := `select "name","category" from "dsa" where "algoords"=$1`
	rows,err:=database.MakeSearchQuery(query,algoords)
	if err!=nil{
		fmt.Println("Error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Algorithm"})
		return
	}
	defer rows.Close()
	var algorithms []algomodel.Algopreview
	for rows.Next(){
		var algorithm algomodel.Algopreview
		if err := rows.Scan(&algorithm.Name, &algorithm.Category); err != nil {
			fmt.Println("Error scanning row:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan row"})
			return
		}
		algorithms = append(algorithms, algorithm)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error during iteration:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error during iteration"})
		return
	}

	c.JSON(http.StatusOK, algorithms)
}

func ThrowBlog(c *gin.Context){
	name:=c.Param("name");
	query := `select "file_path" from "dsa" where "name"=$1`
	file,err:=database.Searchsmt(query,name)
	fmt.Println(file);
	if err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"message":err.Error()})
		return
	}
	c.File("."+file);
}
func ThrowImage(c *gin.Context){
	name:=c.Param("name");
	c.File("./assets/images/"+name);
}

func ThrowQuiz(c *gin.Context){
	name:=c.Param("name");
	query := `SELECT question FROM quiz INNER JOIN dsa ON quiz.dsa_id = dsa.id WHERE name=$1`
	question,err := database.Searchsmt(query,name)
	if err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"message":err.Error()})
		return
	}
	var questions []algomodel.Quiz
	err = json.Unmarshal([]byte(question), &questions)
    		if err != nil {
        		fmt.Println("Error unmarshalling JSON:", err)
        	return
    		}

	c.JSON(http.StatusOK,gin.H{"question":questions})
}

func Evaluation(c *gin.Context) {
	userID, ok := c.Get("userID")
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"Error": "User ID not found"})
		return
	}

	var toCheck algomodel.Quizevaluate
	if err := c.ShouldBind(&toCheck); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
		return
	}

	// Retrieve correct answers for the quiz based on `name`
	name := c.Param("name")
	query := `SELECT correct_ans FROM quiz INNER JOIN dsa ON quiz.dsa_id = dsa.id WHERE name = $1`
	answerStr, err := database.Searchsmt(query, name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	// Parse correct answers from database response
	answerStr = strings.Trim(answerStr, "{}") // Remove curly braces
	correctAns := strings.Split(answerStr, ",")
	for i := range correctAns {
		correctAns[i] = strings.Trim(correctAns[i], `" `) // Trim double quotes and spaces
	}
	fmt.Println(correctAns)
	fmt.Println(toCheck.Answers)
	// Calculate number of correct answers
	var numberOfCorrect int
	for i := range correctAns {
		if correctAns[i] == toCheck.Answers[i] {
			numberOfCorrect++
		}
	}

	// Calculate score percentage
	score := float32(numberOfCorrect) / float32(len(correctAns)) * 100

	// Update progress table with the score
	if score > 65 {
		query = `select id from dsa where name=$1`
		dsaID, err := database.Searchsmt2(query, name)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}

		query = `insert into progress(user_id,dsa_id,score) values($1,$2,$3)`
		err = database.MakeInsertQuery(query, userID, dsaID, score)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}
		query =`SELECT EXISTS (SELECT 1 FROM progress WHERE user_id = $1 AND dsa_id = $2);`
		exist,err:=database.CheckifExist(query,userID,dsaID)
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error":err})
			return
		}
		if !exist {
				query = `select score from leaderboard where user_id=$1`
				marks, err := database.Searchsmt2(query, userID)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
					return
				}

				query = `update leaderboard  set score=$1 where user_id=$2`
				err = database.MakeInsertQuery(query, score+float32(marks), userID)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
					return
				}
		}

		query = `select dsa_id from todaypick where id=$1`
		todayPick, err := database.Searchsmt2(query, 976665072127836161)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
			return
		}
		if dsaID == todayPick {
			day := time.Now().Day()
			query := `SELECT streak_dates FROM streak WHERE user_id = $1`
			datesArr, err := database.Searchsmt3(query, userID)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve streak dates"})
				return
			}
			temparr:=datesArr
			temparr=append(temparr,int64(day))
			longest := findLongestConsecutiveSequence(temparr)

			query = `SELECT longest_streak FROM streak WHERE user_id = $1`
			longestStreak, err := database.Searchsmt2(query, userID)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
				return
			}

			if longest > longestStreak {
				query = `UPDATE streak SET longest_streak = $1 WHERE user_id = $2`
				err = database.MakeInsertQuery(query, longest, userID)
				if err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
					return
				}
			}

			if len(datesArr) == 0 || datesArr[len(datesArr)-1] != int64(day) {
				datesArr = append(datesArr, int64(day))
				query = `UPDATE streak SET streak_dates = $1 WHERE user_id = $2`
				err = database.MakeInsertQuery2(query, datesArr, userID)
				if err != nil {
					c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
					return
				}
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{"Score": numberOfCorrect})
}
func findLongestConsecutiveSequence(arr []int64) int64 {
	if len(arr) == 0 {
		return 0
	}

	maxLength := 1
	currentLength := 1

	for i := 1; i < len(arr); i++ {
		if arr[i] == arr[i-1]+1 {
			currentLength++
		} else if arr[i] != arr[i-1] {
			if currentLength > maxLength {
				maxLength = currentLength
			}
			currentLength = 1
		}
	}

	if currentLength > maxLength {
		maxLength = currentLength
	}

	return int64(maxLength)
}
func Todaypick(c *gin.Context){
	//query the table today's pick which contains algo id and redirect to respective id
	//query:=SELECT id FROM dsa ORDER BY RANDOM() LIMIT 1;
	query := `SELECT name from todaypick INNER JOIN dsa ON todaypick.dsa_id=dsa.id`
	name,err:=database.Searchsmt(query)
	if err!=nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
	  	return
	}
	c.JSON(http.StatusOK,name)
}

func Resetter()error{
	query := `select id from dsa order by RANDOM() LIMIT 1`
	random_id,err := database.Searchsmt2(query)
	if err!=nil{
	return err
	}
	query=`update todaypick set dsa_id=$1 where id=$2`
	err = database.MakeInsertQuery(query,random_id,976665072127836161)
		if err!=nil{
	  	return err
  		}
	return nil
}


