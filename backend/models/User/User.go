package User
import "mime/multipart"

type FormData struct{
 	 Email string `json:"email" binding:"required"`
  	 Password string `json:"password" binding:"required"`
}
type FormDataSign struct{
	 Username string `form:"username" binding:"required"` 
 	 Name string  `form:"name" binding:"required"`
 	 Email string `form:"email" binding:"required"`
	 Img *multipart.FileHeader `form:"image" binding:"required"`
 	 Password string `form:"password" binding:"required"`
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
	 Streak []int64 `json:"streak"`
	 Longest_streak int64 `json:"longeststreak"`
}



