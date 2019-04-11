package main

import (
	"fmt"
	"net/http"
	"strings"
	"log"
)

func HomeRouterHandler(w http.ResponseWriter, r *http.Request){
	r.ParseForm()
	fmt.Println("scheme", r.URL.Scheme)

	fmt.Println(r.Form["url_long"])
	for k,v :=range r.Form{
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v,""))
	}
	fmt.Fprintf(w, "PokerRoom")
}

func apiHendler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hellow, there is api page")
}

func main() {
	http.HandleFunc("/", HomeRouterHandler)
	http.HandleFunc("/api", apiHendler)
	err := http.ListenAndServe(":9000", nil)
	if err != nil{
		log.Fatal("ListenAndServe: ", err)
	}
}