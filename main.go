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

	if err := http.ListenAndServe(":8080", r); err != nil {
		fmt.Printf("Сервер не запустился: %v\n", err)
	}
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Дверной союз")
	fmt.Fprintln(w, "Бэкенд сервиса монтажа дверей в Москве")
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "ОК")

}
func infoHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Установка и монтаж дверей, Москва и МО, 2010г.")

}
