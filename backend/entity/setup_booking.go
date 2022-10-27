package entity

import "time"

var BookA Booking
var BookB Booking
var BookC Booking

var PaymentA Payment
var PaymentB Payment
var PaymentC Payment

func MockUpBooking() {
	// Register Section ---------------------------------------------

	// Payment Section ------------------------------------------------
	DateTimePaymentA := time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local)
	DateTimePaymentB := time.Date(2022, time.October, 13, 11, 12, 01, 0, time.Local)
	DateTimePaymentC := time.Date(2022, time.November, 12, 14, 56, 59, 0, time.Local)
	PaymentA = Payment{
		DateTime: DateTimePaymentA,
		Amount:   1000,
	}
	Db.Model(&Payment{}).Create(&PaymentA)

	PaymentB = Payment{
		DateTime: DateTimePaymentB,
		Amount:   2000,
	}
	Db.Model(&Payment{}).Create(&PaymentB)

	PaymentC = Payment{
		DateTime: DateTimePaymentC,
		Amount:   3000,
	}
	Db.Model(&Payment{}).Create(&PaymentC)

	// Booking Section (main entity) --------------------------------------------------------
	FromDateA := time.Date(2022, time.September, 01, 0, 0, 0, 0, time.Local)
	ToDateA := time.Date(2022, time.September, 05, 0, 0, 0, 0, time.Local)

	FromDateB := time.Date(2022, time.October, 13, 0, 0, 0, 0, time.Local)
	ToDateB := time.Date(2022, time.October, 16, 0, 0, 0, 0, time.Local)

	FromDateC := time.Date(2022, time.November, 12, 0, 0, 0, 0, time.Local)
	ToDateC := time.Date(2022, time.November, 16, 0, 0, 0, 0, time.Local)

	BookA = Booking{
		Room:           RoomA,
		Register:       RegisterA,
		Payment:        PaymentA,
		FromDate:       FromDateA,
		ToDate:         ToDateA,
		NumberOfGuests: 2,
		Status:         "confirm",
	}
	Db.Model(&Booking{}).Create(&BookA)

	BookB = Booking{
		Room:           RoomB,
		Register:       RegisterB,
		Payment:        PaymentB,
		FromDate:       FromDateB,
		ToDate:         ToDateB,
		NumberOfGuests: 3,
		Status:         "confirm",
	}
	Db.Model(&Booking{}).Create(&BookB)

	BookC = Booking{
		Room:           RoomC,
		Register:       RegisterC,
		Payment:        PaymentC,
		FromDate:       FromDateC,
		ToDate:         ToDateC,
		NumberOfGuests: 1,
		Status:         "unconfirm",
	}
	Db.Model(&Booking{}).Create(&BookC)
}
