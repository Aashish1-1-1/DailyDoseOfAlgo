package algomodel
import "mime/multipart"
type Algopreview struct {
	Name     string `json:"name"`
	Category string `json:"category"`
}

type Algo struct{
	file      *multipart.FileHeader `json:"file"` 
}
