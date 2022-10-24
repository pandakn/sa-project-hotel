package entity

import (
	"time"

	"gorm.io/gorm"
)

type Fine struct {
	gorm.Model
	Fine_Choice string
	Check_out   []CheckOut `gorm:"foreignKey:FineID"`
}

type CheckOut struct {
	gorm.Model
	AdminID *uint
	Admin   Admin

	BookingID *uint
	Booking   Booking

	FineID *uint
	Fine   Fine

	CheckOutTime time.Time
	Price        float32
}
