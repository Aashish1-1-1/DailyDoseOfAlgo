package Auth
import(
	"github.com/gin-gonic/gin"
	"net/http"
	"golang.org/x/crypto/bcrypt"
	
	"dailydoseofalgo/models"
	"dailydoseofalgo/database"
)

func HandelSignup(c *gin.Context){
	var data User.FormDataSign

	if err:=c.ShouldBind(&data); err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"Error":err.Error()})
	}
	name := data.Name
	email := data.Email
	password := data.Password
	hashedpw, _:=bcrypt.GenerateFromPassword([]byte(password),bcrypt.DefaultCost)
	password = string(hashedpw)

	query:=`insert into "users"("username", "email","password") values($1, $2, $3)`
	err := database.MakeInsertQuery(query,name,email,password)
	if err!=nil{
	    c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
	  return
  	}
	c.JSON(http.StatusOK, gin.H{"message": "Sent mail please verify"})
}

func HandelLogin(c *gin.Context){
	var data User.FormData

	if err:=c.ShouldBind(&data); err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"Error":err.Error()})
	}
	email := data.Email
	password := data.Password
	query:=`select "password" from "users" where "email"=$1`
	hash,err:=database.Searchsmt(query,email)
	if(err!=nil){
		c.JSON(http.StatusBadRequest,gin.H{"message":"Not found"})
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(hash),[]byte(password))
	if(err==nil){
		c.JSON(http.StatusOK,gin.H{"message":"Password matched"})
		return
	}
	c.JSON(http.StatusBadRequest,gin.H{"message":"Not found"})
}
