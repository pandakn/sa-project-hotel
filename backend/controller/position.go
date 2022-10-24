package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
	_ "golang.org/x/crypto/bcrypt"
)

// GET /post/:id
func GetPost(c *gin.Context) {
	var post entity.Position
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM positions WHERE id = ?", id).Scan(&post).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": post})
}

// GET/posts
func ListPosts(c *gin.Context) {
	var posts []entity.Position
	if err := entity.DB().Raw("SELECT * FROM positions").Scan(&posts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": posts})
}
