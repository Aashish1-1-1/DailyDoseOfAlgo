package Users

import(
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"


	"dailydoseofalgo/models/User"
	"dailydoseofalgo/database"
)

func Throwprofile(c *gin.Context){
	profile:=c.Param("name");
	query := `select "name","score" from progress INNER JOIN dsa on progress.dsa_id=dsa.id INNER JOIN users on progress.user_id=users.id where username=$1`
	rows,err:=database.MakeSearchQuery(query,profile);
	if err!=nil{
		fmt.Println("Error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Profile"})
		return
	}
	defer rows.Close()
	var profiledatas []User.Progress;
	for rows.Next(){
		var profiledata User.Progress;
		if err := rows.Scan(&profiledata.Algorithm, &profiledata.Score); err != nil {
			fmt.Println("Error scanning row:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan row"})
			return
		}
		profiledatas = append(profiledatas, profiledata)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error during iteration:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error during iteration"})
		return
	}
	query = `select username,score from leaderboard INNER JOIN users on leaderboard.user_id=users.id  ORDER BY score DESC LIMIT 5;`
	rows,err =database.MakeSearchQuery(query);
	if err!=nil{
		fmt.Println("Error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Profile"})
		return
	}
	defer rows.Close()
	var leaderboards []User.LeaderBoard;
	var i int32 = 1
	for rows.Next(){
		var leaderboard User.LeaderBoard;
		if err := rows.Scan(&leaderboard.Username, &leaderboard.Score); err != nil {
			fmt.Println("Error scanning row:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan row"})
			return
		}
		leaderboard.ID=fmt.Sprint(i)
		i=i+1
		leaderboards = append(leaderboards, leaderboard)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Error during iteration:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error during iteration"})
		return
	}

	c.JSON(http.StatusOK,gin.H{"progress":profiledatas,"leaderboard":leaderboards})
}

