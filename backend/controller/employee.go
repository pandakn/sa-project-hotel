package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/entity"
	_ "golang.org/x/crypto/bcrypt"
)

// POST/CreateEmployee
func CreateEmployee(c *gin.Context) {
	var employee entity.Employee
	var position entity.Position
	var department entity.Department
	var salary entity.Salary
	var admin entity.Admin

	// ShouldBindJSON => เป็นการ bind request body ในรูป JSON กับ Struct

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error not access": err.Error()})
		return
	}
	// First => คือการ select :> "SELECT * FROM users ORDER BY id LIMIT 1;"
	// RowsAffected => มีการรีเทิร์นค่าที่มีการเปลี่ยนแปลงในเป็นจำนสน row  :  "returns found records count, equals `len(employee)`"

	if tx := entity.DB().Where("id = ?", employee.PositionID).First(&position); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "position not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.DepartmentID).First(&department); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "department not found"})
		return
	}

	if tx := entity.DB().Where("department_id = ? AND position_id = ? ", employee.DepartmentID, employee.PositionID).Find(&salary); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "salary not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", employee.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	rm := entity.Employee{
		Name:    employee.Name,
		Gender:  employee.Gender,
		Age:     employee.Age,
		Contact: employee.Contact,
		Address: employee.Address,
		Date_IN: employee.Date_IN,

		Department: department,
		Position:   position,
		Salary:     salary,
		Admin:      admin,
	}

	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rm})
}

// GET /employee/:id
func GetEmployee(c *gin.Context) {
	var emp entity.Employee
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM employees WHERE id = ?", id).First(&emp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": emp})
}

// GET/employees
func ListEmps(c *gin.Context) {
	var emps []entity.Employee
	if err := entity.DB().Preload("Department").Preload("Position").Preload("Salary").Preload("Admin").Raw("SELECT * FROM employees").Find(&emps).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": emps})
}
