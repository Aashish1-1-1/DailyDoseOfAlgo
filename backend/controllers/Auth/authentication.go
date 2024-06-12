package Auth

import(
	"github.com/gin-gonic/gin"
	"net/http"
	"net/smtp"
	"golang.org/x/crypto/bcrypt"
	"log"
	"github.com/joho/godotenv"
	"os"
	"time"
	"fmt"
	"math/rand"
	"github.com/golang-jwt/jwt/v5"

	"dailydoseofalgo/models/User"
	"dailydoseofalgo/database"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"context"
	"io/ioutil"
	"io"
	"encoding/json"

	firebase "firebase.google.com/go"
    "google.golang.org/api/option"
)

var googleOauthConfig *oauth2.Config

type GoogleUserInfo struct {
    ID            string `json:"id"`
    Email         string `json:"email"`
    VerifiedEmail bool   `json:"verified_email"`
    Name          string `json:"name"`
    Picture       string `json:"picture"`
}


func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Set up Google OAuth configuration
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:5173",
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"profile", "email"},
		Endpoint:     google.Endpoint,
	}
}

func getUserInfoFromResponse(resp *http.Response) (GoogleUserInfo, error) {
    defer resp.Body.Close()

    // Read the response body
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return GoogleUserInfo{}, err
    }

    // Unmarshal the response body into a GoogleUserInfo struct
    var userInfo GoogleUserInfo
    err = json.Unmarshal(body, &userInfo)
    if err != nil {
        return GoogleUserInfo{}, err
    }

    // Return the user information
    return userInfo, nil
}

func HandleGoogleLogin(c *gin.Context) {
	url := googleOauthConfig.AuthCodeURL("state", oauth2.AccessTypeOffline)

	c.Redirect(http.StatusTemporaryRedirect, url)
}

func GetUserInfo(accessToken string) (map[string]interface{}, error) {
    userInfoEndpoint := "https://www.googleapis.com/oauth2/v2/userinfo"
    resp, err := http.Get(fmt.Sprintf("%s?access_token=%s", userInfoEndpoint, accessToken))
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var userInfo map[string]interface{}
    if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
        return nil, err
    }

    return userInfo, nil
}


// Function to sign a JWT with user information
func SignJWT(userInfo map[string]interface{}) (string, error) {
    // Customize the claims as needed
    claims := jwt.MapClaims{
        "sub": userInfo["id"],
		"name": userInfo["name"],
		"email": userInfo["email"],
		"picture": userInfo["picture"],
        "iss": "daily-dose-of-algo",
		"exp": time.Now().Add(time.Hour * 24 * 5).Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secretCode := os.Getenv("SECRET")
    signedToken, err := token.SignedString([]byte(secretCode)) // Replace with your actual secret key
    if err != nil {
        return "", err
    }

    return signedToken, nil
}

func HandleGoogleCallback(c *gin.Context) {
    code := c.Query("code")
    token, err := googleOauthConfig.Exchange(context.Background(), code)
    
    if err != nil {
        fmt.Println("Error exchanging code: " + err.Error())
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    userInfo, err := GetUserInfo(token.AccessToken)
    if err != nil {
        fmt.Println("Error getting user info: " + err.Error())
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    signedToken, err := SignJWT(userInfo)
    if err != nil {
        fmt.Println("Error signing token: " + err.Error())
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": signedToken})
}


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


func uploadToFirebase(filePath string, fileNames string) (string, error) {
	ctx := context.Background()
	configPath := os.Getenv("FIREBASE_CONFIG_PATH")
	opt := option.WithCredentialsFile(configPath)

	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return "", err
	}

	storageClient, err := app.Storage(ctx)
	if err != nil {
		return "", err
	}

	bucketName := os.Getenv("FIREBASE_BUCKET_NAME")
	bucket, err := storageClient.Bucket(bucketName)
	if err != nil {
		return "", err
	}

	// Upload to 'images' directory
	fileName := "images/" + fileNames
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	defer file.Close()

	wc := bucket.Object(fileName).NewWriter(ctx)
	if _, err = file.Seek(0, 0); err != nil {
		return "", err
	}

	if _, err = io.Copy(wc, file); err != nil {
		return "", err
	}

	if err := wc.Close(); err != nil {
		return "", err
	}

	// Generate the public URL
	imageURL := fmt.Sprintf("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media", bucketName, "images%2F"+fileNames)

	return imageURL, nil
}

func HandelSignup(c *gin.Context){
	var data User.FormDataSign

	if err:=c.ShouldBind(&data); err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"Error":err.Error()})
		return
	}
	file:=data.Img

	filePath := "./assets/images/" + file.Filename
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Image save failed"})
		return
	}

	imageURL, err := uploadToFirebase(filePath, file.Filename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Image upload to Firebase failed"})
		return
	}
	err=os.Remove(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError,gin.H{"error":"error deleting file"})
	}
	username := data.Username
	name := data.Name
	email := data.Email
	password := data.Password
	hashedpw, _:=bcrypt.GenerateFromPassword([]byte(password),bcrypt.DefaultCost)
	password = string(hashedpw)
	verification_code := randStr(7);
	query:=`insert into "users"("username", "email", "password","verification_code", "image_url","name") values($1, $2, $3, $4, $5, $6)`
	err = database.MakeInsertQuery(query,username,email,password,verification_code,imageURL,name)
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
		return
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
		query = `select "id" from "users" where "email"=$1`
		user_id,_ := database.Searchsmt(query,email)
		
		fmt.Println("I am here");	
    		if user_id != "0" {
	        // Load the secret key from environment variable
	      		if err := godotenv.Load(); err != nil {
			log.Fatal("Error loading .env file")
		      }
	        secret := os.Getenv("SECRET")
	        if secret == "" {
	            log.Fatal("Secret key not found")
	        }
	
	        // Create JWT token
	        token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
	            "userid": user_id,
	            "exp":    time.Now().Add(time.Hour * 24 * 5).Unix(),
	        })
	
	        // Generate token string
	        tokenString, err := token.SignedString([]byte(secret))
	        if err != nil {
	            c.JSON(http.StatusBadRequest, gin.H{"message": "Token string could not be created"})
	            return
	        }
	       	 c.JSON(http.StatusOK, gin.H{"Auth": tokenString})
		  return
		}
	}

	c.JSON(http.StatusBadRequest,gin.H{"message":"Email or password incorrect"})
}
func IsValid(c *gin.Context){
	userid,_:=c.Get("userID")
	fmt.Println(userid);
	query := `select "username" from "users" where "id"=$1`
	name,err:=database.Searchsmt(query,userid);
	if err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"message":"Unauthorized please login"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"Authenticated":name})
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

