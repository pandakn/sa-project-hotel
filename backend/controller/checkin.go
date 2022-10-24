package controller

import (
	"github.com/pandakn/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /checkin/:id

func GetCheckIn(c *gin.Context) {
	var checkin entity.CheckIn
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM check_ins WHERE id = ?", id).Scan(&checkin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkin})

}

// LIST /checkin

func ListCheckIns(c *gin.Context) {
	var checkin []entity.CheckIn
	if err := entity.DB().Raw("SELECT * FROM check_ins").Scan(&checkin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkin})
}

// POST /checkin

func CreateCheckIns(c *gin.Context) {
	var checkin entity.CheckIn
	var booking entity.Booking
	var extrabed entity.ExtraBed
	var extraservice entity.ExtraService
	var admin entity.Admin

	if err := c.ShouldBindJSON(&checkin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", checkin.BookingID).First(&booking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", checkin.ExtraBedID).First(&extrabed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "extrabed not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", checkin.ExtraServiceID).First(&extraservice); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "extraservice not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", checkin.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	ci := entity.CheckIn{
		Booking:      booking,
		ExtraBed:     extrabed,
		ExtraService: extraservice,
		Admin:        admin,
		CheckInDate:  checkin.CheckInDate,
	}

	if err := entity.DB().Create(&ci).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ci})
}
