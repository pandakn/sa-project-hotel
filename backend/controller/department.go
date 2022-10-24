package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
	_ "golang.org/x/crypto/bcrypt"
)

// GET /dept/:id
func GetDept(c *gin.Context) {
	var dept entity.Department
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM departments WHERE id = ?", id).Scan(&dept).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dept})
}

// GET/depts
func ListDepts(c *gin.Context) {
	var depts []entity.Department
	if err := entity.DB().Raw("SELECT * FROM departments").Scan(&depts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": depts})
}
