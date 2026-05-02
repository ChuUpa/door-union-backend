package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func main() {
	r := chi.NewRouter()

	r.Get("/", rootHandler)
	r.Get("/api/v1/health", healthHandler)
	r.Get("/api/v1/info", infoHandler)

	// Всё что лежит в папке web/static будет доступно по URL /static/...
	r.Handle("/static/*", http.StripPrefix("/static/", http.FileServer(http.Dir("web/static"))))

	if err := http.ListenAndServe(":8080", r); err != nil {
		fmt.Printf("Сервер не запустился: %v\n", err)
	}
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "web/index.html")
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "ОК")

}
func infoHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Установка и монтаж дверей, Москва и МО, 2010г.")

}
