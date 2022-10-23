package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
)

// GET User/:id
func GetUserByID(c *gin.Context) {
	var register entity.Register
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM registers WHERE id=?", id).Scan(&register).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": register})
}

// GET AllUsers
func GetUsers(c *gin.Context) {
	var registers []entity.Register
	if err := entity.DB().Raw("SELECT * FROM registers").Scan(&registers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": registers})
}
