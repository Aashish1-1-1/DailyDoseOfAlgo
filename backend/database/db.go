package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/lib/pq"
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

func MakeInsertQuery2(query string, values ...interface{}) error {
    Init()
    defer CloseDB()

    for i, value := range values {
        switch v := value.(type) {
        case []int64:
            values[i] = pq.Array(v)
        }
    }

    _, err := Db.Exec(query, values...)
    return err
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
func CheckifExist(query string,values ...interface{})(bool,error){
	Init()
	var exist bool
	err := Db.QueryRow(query,values...).Scan(&exist)
	if err!=nil{
		return false,err 
	}
	return exist,nil 
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
func Searchsmt3(query string, values ...interface{}) ([]int64, error) {
    Init()
    defer CloseDB()

    var data []int64
    err := Db.QueryRow(query, values...).Scan(pq.Array(&data))
    if err != nil {
        fmt.Println(err)
        return nil, err
    }

    return data, nil
}
func Searchsmt2(query string,values ...interface{}) (int64,error) {
  Init()
  var data int64
  err := Db.QueryRow(query,values...).Scan(&data)
  if err!=nil{
    fmt.Println(err)
    return -1,err
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

