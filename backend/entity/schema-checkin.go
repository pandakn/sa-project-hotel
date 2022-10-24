package entity

import (
	"time"

	"gorm.io/gorm"
)

type ExtraService struct {
	gorm.Model
	Type      string
	ExtraCost uint
	CheckIn   []CheckIn `gorm:"foreignKey:ExtraServiceID"`
}

type ExtraBed struct {
	gorm.Model
	Amount  uint
	Cost    uint
	CheckIn []CheckIn `gorm:"foreignKey:ExtraBedID"`
}

type CheckIn struct {
	gorm.Model
	CheckInDate time.Time
	// ExtraServiceID เป็น FK
	ExtraServiceID *uint
	ExtraService   ExtraService
	// ExtraBedID เป็น FK
	ExtraBedID *uint
	ExtraBed   ExtraBed
	// BookingID เป็น FK
	BookingID *uint
	Booking   Booking
	// AdminID เป็น FK
	AdminID *uint
	Admin   Admin
}
