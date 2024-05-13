package Verify

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"dailydoseofalgo/database"
)

func HandelVerify(c *gin.Context) {
	verification_code := c.Param("code")
	query := `update "users" set "verification_status"=$1 where verification_code=$2`
	err := database.MakeInsertQuery(query,true,verification_code)
	if err!=nil{
	    c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
	  return
  	}
	fmt.Println(verification_code)
	c.JSON(http.StatusOK, gin.H{"message": "Your account is verified please login"})
}
