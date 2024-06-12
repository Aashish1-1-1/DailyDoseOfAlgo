package main

import (
	"dailydoseofalgo/router"
	"dailydoseofalgo/controllers/algorithm"
	"time"
	"fmt"
)
func Scheduler(){
	timer:=time.NewTicker(24*time.Hour)
	for{
		<-timer.C
		err:=algorithm.Resetter();
		if err!=nil{
			fmt.Println("Error",err)
		}
	}
}
func main() {
	go Scheduler()
	r := router.Routes()
	_ = r.Run(":8080")
}

