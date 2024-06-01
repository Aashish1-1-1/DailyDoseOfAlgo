package router

import(
	"dailydoseofalgo/database"
	"dailydoseofalgo/controllers/Auth"
	"dailydoseofalgo/controllers/algorithm"
	"dailydoseofalgo/middleware"

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
	router.GET("/api/verify/:code",Verify.HandelVerify)
	router.GET("/api/view/:name",algorithm.ThrowBlog)
	router.GET("/api/preview/:algoords",algorithm.ThrowAlgos)
	router.GET("/api/getimage/:name",algorithm.ThrowImage)
	router.GET("/api/quiz/:name",algorithm.ThrowQuiz)
	router.GET("/api/quiz/evaluate/:name",algorithm.Evaluation)
	return router
}
