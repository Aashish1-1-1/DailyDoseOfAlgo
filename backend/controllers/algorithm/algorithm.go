package algorithm

import(
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"

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
	fmt.Println(name);
	query := `select "file_path" from "dsa" where "name"=$1`
	file,err:=database.Searchsmt(query,name)
	fmt.Println(file);
	if err!=nil{
		fmt.Println("Error:", err)
		c.JSON(http.StatusBadRequest,gin.H{"Error":err.Error()})
		return
	}
	c.File("."+file);
}
func ThrowImage(c *gin.Context){
	name:=c.Param("name");
	c.File("./assets/images/"+name);
}