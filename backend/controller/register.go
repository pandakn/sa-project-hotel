package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
	"golang.org/x/crypto/bcrypt"
)

func CreateRegis(c *gin.Context) {
	var gender entity.Gender
	var status entity.Status
	var province entity.Province
	var register entity.Register

	if err := c.ShouldBindJSON(&register); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", register.Gender_ID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", register.Status_ID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", register.Province_ID).First(&province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Province not found"})
		return
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(register.Password), 14)

	rg := entity.Register{
		Gender:    gender,
		Status:    status,
		Province:  province,
		FirstName: register.FirstName,
		LastName:  register.LastName,
		Email:     register.Email,
		Password:  string(password),
	}

	if err := entity.DB().Create(&rg).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rg})
}

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
