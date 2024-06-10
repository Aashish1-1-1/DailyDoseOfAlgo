package algorithm

import(
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"encoding/json"
	"strings"

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

func Evaluation(c *gin.Context){
	user_id,_:=c.Get("userID")
	var tocheck algomodel.Quizevaluate

	if err:=c.ShouldBind(&tocheck); err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"Error":err.Error()})
		return
	}
	name:=c.Param("name");
	query := `SELECT correct_ans from quiz INNER JOIN dsa ON quiz.dsa_id=dsa.id WHERE name=$1`
	answerstr,err := database.Searchsmt(query,name)
	if err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"message":err.Error()})
		return
	}
	answerstr = strings.Trim(answerstr,"[]");
	correctans := strings.Split(answerstr, ", ")

	for i := range correctans {
		correctans[i] = strings.Trim(correctans[i], `"`)
	}
	fmt.Println(tocheck.Answers);		
	fmt.Println(correctans);
	var numberofcorrect int =0;
	for i:= range correctans{
		if(correctans[i]==tocheck.Answers[i]){
			numberofcorrect++;
		}
	}
	//Insert the data into progress table user_id and algo_id and score if score>80
	//If quiz was of today's pick maintain streak else do nothing
	score := float32(numberofcorrect)/float32(len(correctans))*100;
	if(score>80){
		query=`select id from dsa where name=$1`;
		dsa_id,err := database.Searchsmt2(query,name);
		if err!=nil{
	    		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
	  	return
  		}
		query=`insert into progress(user_id,dsa_id,score) values($1,$2,$3)`

		err = database.MakeInsertQuery(query,user_id,dsa_id,score)
		if err!=nil{
	    		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
	  	return
  		}

		query=`select score from leaderboard where user_id=$1`
		marks,err := database.Searchsmt2(query,user_id);
		if err!=nil{
	    		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
	  	return
  		}

		query=`insert into leaderboard(user_id,score) values($1,$2)`

		err = database.MakeInsertQuery(query,user_id,score+float32(marks))
		if err!=nil{
	    		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
	  	return
  		}
	}
	c.JSON(http.StatusOK, gin.H{"Score": numberofcorrect})
}

func Todaypick(c *gin.Context){
	//query the table today's pick which contains algo id and redirect to respective id
	//query:=SELECT id FROM dsa ORDER BY RANDOM() LIMIT 1;
}


