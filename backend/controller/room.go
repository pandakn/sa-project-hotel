package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
	"gorm.io/gorm/clause"
)

// POST /rooms
func CreateRoom(c *gin.Context) {
	var room entity.Room
	var roomZone entity.RoomZone
	var roomType entity.RoomType
	var admin entity.Admin

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร room
	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	// 9: ค้นหา โซนห้อง ด้วย id
	if tx := entity.DB().Where("id = ?", room.RoomZoneID).First(&roomZone); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomZone not found"})
		return
	}

	// 10: ค้นหา roomType ด้วย id
	if tx := entity.DB().Where("id = ?", room.RoomTypeID).First(&roomType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomType not found"})
		return
	}

	// 11: ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", room.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// 12: สร้าง room
	rm := entity.Room{
		RoomZone:   roomZone,
		RoomType:   roomType,
		Admin:      admin,
		RoomNumber: room.RoomNumber,
	}

	// 13: บันทึก
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

	if err := entity.DB().Preload("RoomZone").Preload("RoomType").Preload("Admin").Raw("SELECT * FROM rooms WHERE id = ?", id).First(&room).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room})
}

// GET /rooms
func ListRooms(c *gin.Context) {
	var rooms []entity.Room

	if err := entity.DB().Preload(clause.Associations).Preload("Bookings").Raw("SELECT * FROM rooms").Find(&rooms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rooms})
}

func UpdateStatus(c *gin.Context) {
	// var room entity.Room
	id := c.Param("id")
	status := c.Param("status")

	if err := entity.DB().Model(&entity.Room{}).Where("id=?", id).Update("status", status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": status})
}
