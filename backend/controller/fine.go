package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
)

// GET //:id
func GetFine(c *gin.Context) {
	var fine entity.Fine
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM fines WHERE id = ?", id).Scan(&fine).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fine})
}

// GET /fines
func ListFines(c *gin.Context) {
	var fines []entity.Fine

	if err := entity.DB().Raw("SELECT * FROM fines").Scan(&fines).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fines})
}
