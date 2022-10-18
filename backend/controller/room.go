package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
)

// POST /rooms
func CreateRoom(c *gin.Context) {
	var room entity.Room
	var roomZone entity.RoomZone
	var roomType entity.RoomType
	var admin entity.Admin

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", room.RoomZoneID).First(&roomZone); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomZone not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", room.RoomTypeID).First(&roomType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomType not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", room.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// if err := entity.DB().Create(&room.RoomNumber).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	rm := entity.Room{
		RoomZone:   roomZone,
		RoomType:   roomType,
		Admin:      admin,
		RoomNumber: room.RoomNumber,
	}

	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rm})
}

// GET /user/:id
func GetRoom(c *gin.Context) {
	var room entity.Room
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM rooms WHERE id = ?", id).Scan(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /rooms
func ListRooms(c *gin.Context) {
	var rooms []entity.Room

	if err := entity.DB().Preload("RoomZone").Preload("RoomType").Preload("Admin").Raw("SELECT * FROM rooms").Find(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rooms})
}
