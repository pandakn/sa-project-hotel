package controller

import (
	"github.com/pandakn/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /verify/:id ดึงข้อมูล verify ทีละตัวโดยใช้ id
func GetVerify(c *gin.Context) {
	var verify entity.Verify
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM verifies WHERE id = ?", id).Scan(&verify).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": verify})
}

// GET /verifys ดึงข้อมูล verify ทั้งหมด
func ListVerifys(c *gin.Context) {
	var verifys []entity.Verify

	if err := entity.DB().Raw("SELECT * FROM verifies").Scan(&verifys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": verifys})
}
