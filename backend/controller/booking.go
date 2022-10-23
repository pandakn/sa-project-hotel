package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
)

// POST /Bookings
func CreateBooking(c *gin.Context) {
	var booking entity.Booking
	var payment entity.Payment
	var register entity.Register
	var room entity.Room

	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", booking.PaymentID).First(&payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomZone not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", booking.RegisterID).First(&register); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "roomType not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", booking.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// if err := entity.DB().Create(&booking.FromDate).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// if err := entity.DB().Create(&booking.ToDate).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// if err := entity.DB().Create(&booking.NumberOfGuests).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// if err := entity.DB().Create(&booking.Status).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	bk := entity.Booking{
		Register:       register,
		Payment:        payment,
		Room:           room,
		FromDate:       booking.FromDate,
		ToDate:         booking.ToDate,
		NumberOfGuests: booking.NumberOfGuests,
		Status:         booking.Status,
	}

	if err := entity.DB().Create(&bk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bk})
}

// GET /user/:id
func GetBookingByID(c *gin.Context) {
	var booking entity.Booking
	id := c.Param("id")

	if err := entity.DB().Preload("Payment").Preload("Register").Preload("Room").Raw("SELECT * FROM rooms WHERE id = ?", id).First(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": booking})
}

// GET /rooms
func GetBookings(c *gin.Context) {
	var bookings []entity.Booking

	if err := entity.DB().Preload("Payment").Preload("Register").Preload("Room").Raw("SELECT * FROM bookings").Find(&bookings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookings})
}
