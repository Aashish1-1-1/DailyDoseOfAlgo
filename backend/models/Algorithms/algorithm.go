package algomodel
import "mime/multipart"
type Algopreview struct {
	Name     string `json:"name"`
	Category string `json:"category"`
}

type Algo struct{
	file      *multipart.FileHeader `json:"file"` 
}

type Option struct {
    ID   string `json:"id"`
    Text string `json:"text"`
}

type Quiz struct{
	Id int `json:"id"`
	Question string `json:"question"`
	Options []Option `json:"options"`
}
type Quizevaluate struct{
	Answers []string `json:"answers"`
}
