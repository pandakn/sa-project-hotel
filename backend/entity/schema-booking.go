package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	//ID String
	gorm.Model
	//------------------------
	DateTime      time.Time
	Amount        int
	Bookings      []Booking      `gorm:"foreignKey:PaymentID"`
	Confirmations []Confirmation `gorm:"foreignKey:PaymentID"`
}

type Booking struct {
	//BookingID
	gorm.Model
	//RoomID => FK
	RoomID *uint
	Room   Room
	//RegisterID => FK
	RegisterID *uint
	Register   Register
	// PaymentID => fk
	PaymentID *uint
	Payment   Payment
	//--------------------------
	FromDate       time.Time
	ToDate         time.Time
	NumberOfGuests int
	Status         string
	CheckOut       []CheckOut `gorm:"foreignKey:BookingID"`
	CheckIn        []CheckIn  `gorm:"foreignKey:BookingID"`
}
