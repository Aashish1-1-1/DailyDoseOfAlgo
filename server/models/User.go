package User

type FormData struct{
 	 Email string `form:"email" binding:"required"`
  	 Password string `form:"password" binding:"required"`
}
type FormDataSign struct{
 	 Name string  `form:"name" binding:"required"`
 	 Email string `form:"email" binding:"required"`
 	 Password string `form:"password" binding:"required"`
}
