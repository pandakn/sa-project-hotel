package entity

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	// ID       string
	Name     string
	Username string `gorm:"uniqueIndex"`
	Password string
	Avatar   string
	Rooms    []Room `gorm:"foreignKey:AdminID"`
}

type RoomType struct {
	gorm.Model
	Name       string
	Price      float32
	Bed        string
	RoomSize   string
	CoverImage string
	Rooms      []Room `gorm:"foreignKey:RoomTypeID"`
}

type RoomZone struct {
	gorm.Model
	Zone        string
	Description string
	Rooms       []Room `gorm:"foreignKey:RoomZoneID"`
}

type Room struct {
	gorm.Model
	RoomNumber string `gorm:"uniqueIndex"`
	// RoomTypeID เป็น FK
	RoomZoneID *uint
	RoomZone   RoomZone
	// RoomTypeID เป็น FK
	RoomTypeID *uint
	RoomType   RoomType
	// AdminID เป็น FK
	AdminID *uint
	Admin   Admin

	Bookings []Booking `gorm:"foreignKey:RoomID"`
}
