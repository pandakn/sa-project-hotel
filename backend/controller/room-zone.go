package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
)

// GET /user/:id
func GetRoomZone(c *gin.Context) {
	var room entity.RoomZone
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM room_zones WHERE id = ?", id).Scan(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /room-types
func ListRoomZones(c *gin.Context) {
	var rooms []entity.RoomZone

	if err := entity.DB().Raw("SELECT * FROM room_zones").Scan(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rooms})
}
