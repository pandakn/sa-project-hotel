package controller

import (
	"github.com/pandakn/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /extraservice/:id

func GetExtraService(c *gin.Context) {
	var extraservice entity.ExtraService
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM extra_services WHERE id = ?", id).Scan(&extraservice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extraservice})

}

// LIST /extraservice

func ListExtraServices(c *gin.Context) {
	var extraservice []entity.ExtraService
	if err := entity.DB().Raw("SELECT * FROM extra_services").Scan(&extraservice).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extraservice})
}
