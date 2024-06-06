package Verify

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"os"
	"strings"
	"github.com/joho/godotenv"
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

func JwtAuthMiddleware(c *gin.Context) {
authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
		c.Abort()
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")
	if tokenString == authHeader {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Bearer token required"})
		c.Abort()
		return
	}

	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
	secret := os.Getenv("SECRET")
	if secret == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "JWT_SECRET not set"})
		c.Abort()
		return
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		c.Abort()
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

	userID, ok := claims["userid"].(string)
	if !ok {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	fmt.Println(userID)

	// Pass userID to the next handlers
	c.Set("userID", userID)
	c.Next()
}

