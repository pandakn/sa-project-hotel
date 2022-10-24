package entity

import (
	"time"

	"gorm.io/gorm"
)

// type Register struct {
// 	//RegisterID
// 	gorm.Model
// 	FirstName string
// 	LastName  string
// 	Gender    int
// 	Status    int
// 	Province  int
// 	Password  string
// 	Email     string    `gorm:"uniqueIndex"`
// 	Bookings  []Booking `gorm:"foreignKey:RegisterID"`
// }

type Payment struct {
	//ID String
	gorm.Model
	//------------------------
	DateTime time.Time
	Amount   int
	UrlPhoto string
	Bookings []Booking `gorm:"foreignKey:PaymentID"`
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
}
