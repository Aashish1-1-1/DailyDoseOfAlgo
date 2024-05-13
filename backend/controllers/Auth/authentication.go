package Auth
import(
	"github.com/gin-gonic/gin"
	"net/http"
	"net/smtp"
	"golang.org/x/crypto/bcrypt"
	"log"
	"github.com/joho/godotenv"
	"os"
	"math/rand"

	"dailydoseofalgo/models/User"
	"dailydoseofalgo/database"
)
func randStr(n int) string {

	// define the given charset, char only
	var charset = []byte("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]byte, n)
	for i := range b {
		// randomly select 1 character from given charset
		b[i] = charset[rand.Intn(len(charset))]
	}
	return string(b)
}

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
	verification_code := randStr(7);
	query:=`insert into "users"("username", "email","password","verification_code") values($1, $2, $3,$4)`
	err := database.MakeInsertQuery(query,name,email,password,verification_code)
	if err!=nil{
	    c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
	  return
  	}
	err = SendMail(email,verification_code);
	if err!=nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error":err})
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
		query =`select "verification_status" from "users" where "email"=$1`
		verification_status,_ := database.Searchsmt(query,email)
		if(verification_status=="false"){
			query=`select "verification_code" from "users" where "email"=$1`
			verification_code,_ := database.Searchsmt(query,email);
			err = SendMail(email,verification_code);
			if err!=nil{
				c.JSON(http.StatusInternalServerError,gin.H{"error":err})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "Sent mail please verify"})
			return
		}

		c.JSON(http.StatusOK,gin.H{"message":"Password matched"})
		return
	}
	c.JSON(http.StatusBadRequest,gin.H{"message":"Not found"})
}


func SendMail(email string,verification_code string) error {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	// Choose auth method and set it up
	
	auth := smtp.PlainAuth("DailyDosofoAlgo", os.Getenv("email"), os.Getenv("password"), "smtp.gmail.com")
	
	// Here we do it all: connect to our server, set up a message and send it
		
	to := []string{email}
	
	msg := []byte("To:"+ email + "\r\n" +
	
	"Subject: Verification mail\r\n" +
	
	"\r\n" +
	"http://localhost:8080/api/verify/"+verification_code+"\r\n")

	err := smtp.SendMail("smtp.gmail.com:587", auth, os.Getenv("email"), to, msg)
	
	if err != nil {
	return err;	
	}
	return nil; 
}
