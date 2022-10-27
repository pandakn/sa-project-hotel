package controller

import (
	"github.com/pandakn/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

func CreateConfirmation(c *gin.Context) {
	var confirmation entity.Confirmation
	var payment entity.Payment
	var verify entity.Verify
	var admin entity.Admin

	if err := c.ShouldBindJSON(&confirmation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", confirmation.PaymentID).First(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", confirmation.VerifyID).First(&verify); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "verify not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", confirmation.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// if err := entity.DB().Create(&room.RoomNumber).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	rm := entity.Confirmation{
		Payment:              payment,
		Verify:               verify,
		Admin:                admin,
		DateTimeConfirmation: confirmation.DateTimeConfirmation,
	}

	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rm})
}

// GET /confirmation/:id ดึงข้อมูล confirmation ทีละตัวโดยใช้ id
func GetConfirmation(c *gin.Context) {
	var confirm entity.Confirmation
	id := c.Param("id")

	if err := entity.DB().Preload("Admin").Preload("Verify").Raw("SELECT * FROM confirmations WHERE id = ?", id).Scan(&confirm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": confirm})
}

// GET /confirmations ดึงข้อมูล confirmation ทั้งหมด
func ListConfirmations(c *gin.Context) {
	var confirms []entity.Confirmation

	if err := entity.DB().Preload("Admin").Preload("Verify").Raw("SELECT * FROM confirmations").Scan(&confirms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": confirms})
}
