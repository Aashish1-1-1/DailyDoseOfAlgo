package main

import (
	"fmt"
	"net/http"
)

func handleRequest(w http.ResponseWriter, r *http.Request) {
	message := fmt.Sprintf("Hello from server")

	fmt.Fprintf(w, message)
}

func main() {

	http.HandleFunc("/", handleRequest)

	fmt.Println("Server is listening on port 6996...")

	http.ListenAndServe(":6996", nil)
}
