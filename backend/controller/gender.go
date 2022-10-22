package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
)

// GET /user/:id
func GetGender(c *gin.Context) {
	var gender entity.Gender
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM gender WHERE id = ?", id).Scan(&gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": gender})
}

// GET /room-types
func ListGender(c *gin.Context) {
	var gender []entity.Gender

	if err := entity.DB().Raw("SELECT * FROM Gender").Scan(&gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": gender})
}
