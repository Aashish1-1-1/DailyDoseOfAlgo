package router

import(
	"dailydoseofalgo/database"
	"dailydoseofalgo/controllers/Auth"
	"dailydoseofalgo/controllers/algorithm"
	"dailydoseofalgo/controllers/users"
	"dailydoseofalgo/middleware"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"net/http"
)

func Routes() *gin.Engine {
    database.Init()
    defer database.CloseDB()

    router := gin.Default()

    // CORS middleware with custom options
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"*"} // Allow requests from any origin
    config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"} // Allow specific HTTP methods
    config.AllowHeaders = []string{"Authorization", "Content-Type"} // Allow specific headers
    router.Use(cors.New(config))


    router.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "Hello from server"})
    })
    router.POST("/api/login", Auth.HandelLogin)
    router.POST("/api/signup", Auth.HandelSignup)
    router.GET("/api/verify/:code", Verify.HandelVerify)
    router.GET("/api/view/:name", algorithm.ThrowBlog)
    router.GET("/api/preview/:algoords", algorithm.ThrowAlgos)
    router.GET("/api/getimage/:name", algorithm.ThrowImage)
    router.GET("/api/quiz/:name", algorithm.ThrowQuiz)
    router.POST("/api/quiz/evaluate/:name",Verify.JwtAuthMiddleware,algorithm.Evaluation)
    router.POST("/api/isvalid", Verify.JwtAuthMiddleware,Auth.IsValid)
    router.GET("/api/todaypick", algorithm.Todaypick)
    router.GET("/api/profile/:name", Users.Throwprofile)

    // Google OAuth routes
     router.GET("/auth/google", Auth.HandleGoogleLogin)
     router.GET("/auth/google/callback", Auth.HandleGoogleCallback)
    return router
}


