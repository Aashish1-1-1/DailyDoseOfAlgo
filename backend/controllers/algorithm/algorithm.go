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
		fmt.Println(numberofcorrect)
		fmt.Println(len(correctans))
	c.JSON(http.StatusOK, gin.H{"Score": float32(numberofcorrect)/float32(len(correctans))*100})
}
