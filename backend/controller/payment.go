package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
)

// GET Payment/:id
func GetPaymentByID(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM payments WHERE id=?", id).Scan(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET AllPayments
func GetPayments(c *gin.Context) {
	var payments []entity.Payment
	if err := entity.DB().Raw("SELECT * FROM payments").Scan(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payments})
}
