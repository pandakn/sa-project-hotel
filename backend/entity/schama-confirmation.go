package entity

import (
	"time"

	"gorm.io/gorm"
)

type Verify struct {
	gorm.Model
	VName         string
	Confirmations []Confirmation `gorm:"foreignKey:VerifyID"`
}

type Confirmation struct {
	gorm.Model
	DateTimeConfirmation time.Time
	// AdminID 	ทำหน้าที่เป็น FK
	AdminID *uint
	Admin   Admin
	//PaymentID 	ทำหน้าที่เป็น FK
	PaymentID *uint
	Payment   Payment
	//VerifyID 	ทำหน้าที่เป็น FK
	VerifyID *uint
	Verify   Verify
}
