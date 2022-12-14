package entity

import (
	"time"
)

func MockupEmp() {

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
		Amount:     28000,
	}
	Db.Model(&Salary{}).Create(&sal2)

	sal3 := Salary{
		Department: dept3,
		Position:   post2,
		Amount:     21000,
	}
	Db.Model(&Salary{}).Create(&sal3)

	// -------------------(Create value Employee)-----------------------------------

	Db.Model(&Employee{}).Create(&Employee{
		Department: dept1,
		Position:   post2,
		Salary:     sal1,
		Admin:      AdminA,
		Name:       "พระบิดา",
		Gender:     "Male",
		Age:        62,
		Contact:    "080xxxxxx",
		Address:    "90/3 บ.หนองน้ำ",
		Date_IN:    time.Now(),
	})

	Db.Model(&Employee{}).Create(&Employee{
		Department: dept2,
		Position:   post3,
		Salary:     sal2,
		Admin:      AdminA, //ใช้ข้อมูลจาก schema-room โดยใช้ในส่วนของ Admin ที่ประกาศตัวแปรไว้แบบ global
		Name:       "จารย์แดง กีต้าไฟ",
		Gender:     "Male",
		Age:        64,
		Contact:    "089233xxxx",
		Address:    "111/7 บ.หนองฮี",
		Date_IN:    time.Now(),
	})

	Db.Model(&Employee{}).Create(&Employee{
		Department: dept3,
		Position:   post2,
		Salary:     sal3,
		Admin:      AdminB,
		Name:       "ลุงโทนี่",
		Gender:     "Male",
		Age:        52,
		Contact:    "089111xxxx",
		Address:    "12/4 บ.บึง",
		Date_IN:    time.Now(),
	})
}
