package router

import(
	"dailydoseofalgo/database"
	"dailydoseofalgo/controllers/Auth"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"net/http"
)

func Routes() *gin.Engine{
	database.Init()
	defer database.CloseDB()

	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/",func(c *gin.Context){
		c.JSON(http.StatusOK,gin.H{"message":"Hello from server"})
	})
	router.POST("/api/login",Auth.HandelLogin)
   	router.POST("/api/signup",Auth.HandelSignup)
	return router
}
