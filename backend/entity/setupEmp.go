package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

func MockupEmp() {
	// -------------------(Create value User_Admin)-----------------------------------

	// -------------------(ค้นหา AdminID ด้วย User_name ที่เข้าระบบมาใส่ใน  Entity Employee)-------------------------------
	passwordA, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	// Admin
	AdminA := Admin{
		Name:     "Natthawut",
		Username: "keemknkx",
		Password: string(passwordA),
		Avatar:   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyMpnpMCeglR1cE8vNKuktuI0zh4PR3HNnEg&usqp=CAU",
	}
	Db.Model(&Admin{}).Create(&AdminA)

	passwordB, _ := bcrypt.GenerateFromPassword([]byte("admin"), 14)
	AdminB := Admin{
		Name:     "admin",
		Username: "admin",
		Password: string(passwordB),
		Avatar:   "https://img.buzzfeed.com/buzzfeed-static/static/2019-01/23/13/asset/buzzfeed-prod-web-06/sub-buzz-1138-1548268729-1.jpg?crop=450:450;233,0",
	}
	Db.Model(&Admin{}).Create(&AdminB)

	// -------------------(Create value Position)-----------------------------------

	post1 := Position{
		Name:        "Manager",
		Description: "ผู้จัดการ...",
	}
	Db.Model(&Position{}).Create(&post1)

	post2 := Position{
		Name:        "Head",
		Description: "หัวหน้าแผนก...",
	}
	Db.Model(&Position{}).Create(&post2)

	post3 := Position{
		Name:        "Officer",
		Description: "เจ้าหน้าที่...",
	}
	Db.Model(&Position{}).Create(&post3)

	post4 := Position{
		Name:        "general staff",
		Description: "พนักงานทั่วไป",
	}
	Db.Model(&Position{}).Create(&post4)

	// post := []Position{
	// 	{Name:"Manager",Description: "ผู้จัดการ..."},
	// 	{Name:"Head",Description: "หัวหน้าแผนก..."},
	// 	{Name:"Officer",Description: "เจ้าหน้าที่..."},
	// 	{Name:"general staff",Description: "พนักงานทั่วไป"},
	// }
	// db.Model(&Position{}).Create(&post)

	// -------------------(Create value Department)-----------------------------------

	dept1 := Department{
		DeptName:    "Financial Department",
		Description: "แผนกการเงิน",
		GetStaff:    true,
	}
	Db.Model(&Department{}).Create(&dept1)

	dept2 := Department{
		DeptName:    "Security Department",
		Description: "แผนกฝ่ายรักษาความปลอดภัย",
		GetStaff:    true,
	}
	Db.Model(&Department{}).Create(&dept2)

	dept3 := Department{
		DeptName:    "Repair Department",
		Description: "แผนกซ่อมแวมสำหรับติดต่อแจ้งซ่อม",
		GetStaff:    true,
	}
	Db.Model(&Department{}).Create(&dept3)

	// -------------------(Create value Salary)-----------------------------------

	sal1 := Salary{
		Department: dept1,
		Position:   post2,
		Amount:     52000,
	}
	Db.Model(&Salary{}).Create(&sal1)

	sal2 := Salary{
		Department: dept2,
		Position:   post3,
		Amount:     2800,
	}
	Db.Model(&Salary{}).Create(&sal2)

	sal3 := Salary{
		Department: dept3,
		Position:   post2,
		Amount:     2100,
	}
	Db.Model(&Salary{}).Create(&sal3)

	// -------------------(Create value Employee)-----------------------------------

	Db.Model(&Employee{}).Create(&Employee{
		Department: dept1,
		Position:   post2,
		Salary:     sal1,
		Admin:      AdminA,
		Name:       "ข้าวเกรียบ พระบิดา",
		Gender:     "Male",
		Age:        62,
		Contact:    "084211xxx",
		Address:    "90/3 บ.หนองน้ำ",
		Date:       time.Now(),
	})

	Db.Model(&Employee{}).Create(&Employee{
		Department: dept2,
		Position:   post3,
		Salary:     sal2,
		Admin:      AdminB,
		Name:       "จารย์แดง กีต้าไฟ",
		Gender:     "Male",
		Age:        64,
		Contact:    "089233xxx",
		Address:    "111/7 บ.หนองฮี",
		Date:       time.Now(),
	})

	Db.Model(&Employee{}).Create(&Employee{
		Department: dept3,
		Position:   post2,
		Salary:     sal3,
		Admin:      AdminB,
		Name:       "ลุงโทนี่",
		Gender:     "Male",
		Age:        52,
		Contact:    "089111xxx",
		Address:    "12/4 บ.บึง",
		Date:       time.Now(),
	})
}
