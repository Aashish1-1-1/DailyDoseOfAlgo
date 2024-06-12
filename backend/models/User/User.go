package User

type FormData struct{
 	 Email string `json:"email" binding:"required"`
  	 Password string `json:"password" binding:"required"`
}
type FormDataSign struct{
	 Username string `json:"username" binding:"required"` 
 	 Name string  `json:"username" binding:"required"`
 	 Email string `json:"email" binding:"required"`
 	 Password string `json:"password" binding:"required"`
}
type LeaderBoard struct {
	ID string `json:"id"`
	Username string `json:"username"`
	Score int32 `json:"score"`
}
type Progress struct {
	Algorithm string `json:"algorithm"`
	Score	int32`json:"score"` 
}
type ProfileData struct{
 	 LeaderBoarddata LeaderBoard  `json:"leaderboard"`
 	 Progressdata Progress `json:"progress"`
}


