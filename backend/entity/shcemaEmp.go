package entity

import (
	"time"

	"gorm.io/gorm"
)

type Department struct {
	gorm.Model
	DeptName    string
	Description string
	GetStaff    bool
	Employee    []Employee `gorm:"foreignKey:DepartmentID"`
	Salary      []Salary   `gorm:"foreignKey:DepartmentID"`
}

type Position struct {
	gorm.Model
	Name        string
	Description string
	Employee    []Employee `gorm:"foreignKey:PositionID"`
	Salary      []Salary   `gorm:"foreignKey:PositionID"`
}

type Salary struct {
	gorm.Model
	DepartmentID *uint
	Department   Department
	PositionID   *uint
	Position     Position
	Amount       int
	Employee     []Employee `gorm:"foreignKey:SalaryID"`
}

type Employee struct {
	gorm.Model
	Name    string
	Gender  string
	Age     uint
	Contact string
	Address string
	Date    time.Time

	AdminID *uint
	Admin   Admin

	DepartmentID *uint
	Department   Department

	PositionID *uint
	Position   Position

	SalaryID *uint
	Salary   Salary
}
