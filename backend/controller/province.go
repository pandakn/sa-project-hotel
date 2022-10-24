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

	if err := entity.DB().Raw("SELECT * FROM provinces WHERE id = ?", id).Scan(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}

// GET /province
func ListProvince(c *gin.Context) {
	var provinces []entity.Province

	if err := entity.DB().Raw("SELECT * FROM provinces").First(&provinces).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": provinces})
}