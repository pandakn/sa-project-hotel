package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
)

// GET /user/:id
func GetProvince(c *gin.Context) {
	var province entity.Province
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM province WHERE id = ?", id).Scan(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}

// GET /room-types
func ListProvince(c *gin.Context) {
	var province []entity.Province

	if err := entity.DB().Raw("SELECT * FROM province").Scan(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}