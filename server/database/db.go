package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
	"github.com/joho/godotenv"
)

var Db *sql.DB

func Init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	psqlInfo := os.Getenv("DB_connstr")
	//psqlInfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Successfully connected!")
  Db = db
}


func MakeInsertQuery(query string,values ...interface{}) error {
  Init()
//	prepare := `insert into "users"("username", "email","password") values($1, $2, $3)`
	_, err := Db.Exec(query,values...)
	if err != nil {
    fmt.Println(err)
		return err
	}
	fmt.Println("Query done Successfully")
  CloseDB()
	return nil
}


func LoginQuery(email string,password string) (int,error) {
  Init()
  var password1 string
  var id int
  query := `SELECT "user_id","password" FROM "users" WHERE "email"=$1`
  err := Db.QueryRow(query, email).Scan(&id,&password1)
  if err!=nil{
    fmt.Println(err)
    return 0,err
  }
   if password1!=password{
      fmt.Println("Password not match")
      return 0,nil 
  }
  CloseDB()
  fmt.Println("Password Matched")
  return id,nil
}
func Searchsmt(query string,values ...interface{}) (string,error) {
  Init()
  var data string
  err := Db.QueryRow(query,values...).Scan(&data)
  if err!=nil{
    fmt.Println(err)
    return "nothing",err
  }
  CloseDB()
  return data,nil 
}
func MakeSearchQuery(query string,values ...interface{}) (*sql.Rows,error) {
  Init()
  rows,err :=Db.Query(query,values...)
  if err!=nil{
    fmt.Println(err)
    return rows,err
  }

  fmt.Println("Query done Successfully")
  CloseDB()
  return rows,nil
}
func CloseDB() {
	if Db != nil {
		Db.Close()
		fmt.Println("Closed connection")
	}
}
