package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
)

// GET /user/:id
func GetStatus(c *gin.Context) {
	var status entity.RoomType
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM status WHERE id = ?", id).Scan(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}

// GET /room-types
func ListStatus(c *gin.Context) {
	var status []entity.RoomType

	if err := entity.DB().Raw("SELECT * FROM Status").Scan(&status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": status})
}
