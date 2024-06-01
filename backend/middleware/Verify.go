package Verify

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"os"
	"time"
	"github.com/golang-jwt/jwt/v5"

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

func CheckAuthorization(c *gin.Context) {
	tokenString, err := c.Cookie("Auth")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// Load secret key from environment variable
		secret := os.Getenv("SECRET")
		if secret == "" {
			fmt.Println("Secret not found")
		}

		return []byte(secret), nil
	})

	if err != nil || !token.Valid {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	exp, ok := claims["exp"].(float64)
	if !ok || float64(time.Now().Unix()) > exp {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	userID, ok := claims["userid"].(float64)
	if !ok {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
//  var user string
//  query := `SELECT "name" FROM "users" WHERE "user_id"=$1`
//  user, err = database.Searchsmt(query, int(userID))
//  if err!=nil{
//    c.AbortWithStatus(http.StatusInternalServerError)
//  }
//	if err != nil {
//		c.AbortWithStatus(http.StatusInternalServerError)
//		return
//	}
//
	c.Set("user", userID)
	c.Next()
}
