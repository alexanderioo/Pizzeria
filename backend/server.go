package main

import (
	"fmt"
	"net/http"
)

func withCORS(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		handler.ServeHTTP(w, r)
	})
}

func main() {
	fileHandler := http.FileServer(http.Dir("data"))
	http.Handle("/items.json", withCORS(fileHandler))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Fprintln(w, "Go backend с CORS работает!")
	})

	fmt.Println("✅ Сервер запущен на http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
