package User

type FormData struct{
 	 Email string `json:"email" binding:"required"`
  	 Password string `json:"password" binding:"required"`
}
type FormDataSign struct{
 	 Name string  `json:"username" binding:"required"`
 	 Email string `json:"email" binding:"required"`
 	 Password string `json:"password" binding:"required"`
}
