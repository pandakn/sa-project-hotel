package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
	_ "golang.org/x/crypto/bcrypt"
)

// GET /salary/:id
func GetSalary(c *gin.Context) {
	var salary entity.Salary
	id := c.Param("id")
	//First -> เป็นการ select ข้อมูล โดยทำการบันทึกตัวแรกที่ตรงกับเงื่อนไขที่กำหนด เรียงลำดับตามคีย์หลัก

	if err := entity.DB().Preload("Department").Preload("Position").Raw("SELECT * FROM salaries WHERE id = ?", id).First(&salary).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": salary})
}

// GET/salaries
func ListSalaries(c *gin.Context) {
	var salarys []entity.Salary
	// Find -> ค้นหาและบันทึกตัวที่ตรงกับเงื่อนไขที่กำหนด(ทั้งหมดที่ตรงกับเงื่อนไข)  == Scan ก็ทำงานคล้ายกับ Find
	if err := entity.DB().Preload("Department").Preload("Position").Raw("SELECT * FROM salaries").Find(&salarys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": salarys})
}
