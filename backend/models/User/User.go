package User

type FormData struct{
 	 Email string `json:"email" binding:"required"`
  	 Password string `json:"password" binding:"required"`
}
type FormDataSign struct{
	 Username string `json:"username" binding:"required"` 
 	 Name string  `json:"name" binding:"required"`
 	 Email string `json:"email" binding:"required"`
 	 Password string `json:"password" binding:"required"`
}
type LeaderBoard struct {
	ID string `json:"id"`
	Username string `json:"username"`
	Name string `json:"name"`
	Score int32 `json:"score"`
}
type Progress struct {
	Algorithm string `json:"algorithm"`
	Score	int32`json:"score"` 
}
type ProfileData struct{
	 Name string `json:"name"`
	 ProfileImage string `json:"profileImage"`
 	 LeaderBoarddata []LeaderBoard  `json:"leaderboard"`
 	 Progressdata []Progress `json:"progress"`
}


