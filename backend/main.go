package main

import (
	"dailydoseofalgo/router"
)

func main() {
	r := router.Routes()
	_ = r.Run(":8080")
}
