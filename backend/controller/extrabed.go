package controller

import (
	"github.com/pandakn/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /extrabed/:id

func GetExtraBed(c *gin.Context) {
	var extrabed entity.ExtraBed
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM extra_beds WHERE id = ?", id).Scan(&extrabed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extrabed})

}

// LIST /extrabed

func ListExtraBeds(c *gin.Context) {
	var extrabed []entity.ExtraBed
	if err := entity.DB().Raw("SELECT * FROM extra_beds").Scan(&extrabed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": extrabed})
}
