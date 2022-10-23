package entity

import "time"

func MockUpBooking() {
	// Register Section ---------------------------------------------
	RegisterA := Register{
		FirstName: "Sakdipat",
		LastName:  "Mujarin",
		Gender:    1,
		Status:    1,
		Province:  1,
		Password:  "11111111",
		Email:     "Bluetae.20@gmail.com",
	}
	Db.Model(&Register{}).Create(&RegisterA)

	RegisterB := Register{
		FirstName: "Lalita",
		LastName:  "Namwong",
		Gender:    2,
		Status:    2,
		Province:  2,
		Password:  "22222222",
		Email:     "Lali_00@gmail.com",
	}
	Db.Model(&Register{}).Create(&RegisterB)

	RegisterC := Register{
		FirstName: "Panita",
		LastName:  "Supap",
		Gender:    3,
		Status:    1,
		Province:  3,
		Password:  "33333333",
		Email:     "Panita_11@gmail.com",
	}
	Db.Model(&Register{}).Create(&RegisterC)

	// Payment Section ------------------------------------------------
	DateTimePaymentA := time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local)
	DateTimePaymentB := time.Date(2022, time.October, 13, 11, 12, 01, 0, time.Local)
	DateTimePaymentC := time.Date(2022, time.November, 12, 14, 56, 59, 0, time.Local)
	PaymentA := Payment{
		DateTime: DateTimePaymentA,
		Amount:   1000,
		UrlPhoto: "https://ibb.co/vHHFYHQ",
	}
	Db.Model(&Payment{}).Create(&PaymentA)

	PaymentB := Payment{
		DateTime: DateTimePaymentB,
		Amount:   2000,
		UrlPhoto: "https://ibb.co/LRt7F7s",
	}
	Db.Model(&Payment{}).Create(&PaymentB)

	PaymentC := Payment{
		DateTime: DateTimePaymentC,
		Amount:   3000,
		UrlPhoto: "https://ibb.co/Jmdwvsj",
	}
	Db.Model(&Payment{}).Create(&PaymentC)

	// Booking Section (main entity) --------------------------------------------------------
	FromDateA := time.Date(2022, time.September, 01, 0, 0, 0, 0, time.Local)
	ToDateA := time.Date(2022, time.September, 05, 0, 0, 0, 0, time.Local)

	FromDateB := time.Date(2022, time.October, 13, 0, 0, 0, 0, time.Local)
	ToDateB := time.Date(2022, time.October, 16, 0, 0, 0, 0, time.Local)

	FromDateC := time.Date(2022, time.November, 12, 0, 0, 0, 0, time.Local)
	ToDateC := time.Date(2022, time.November, 16, 0, 0, 0, 0, time.Local)

	Db.Model(&Booking{}).Create(&Booking{
		Room:           RoomA,
		Register:       RegisterA,
		Payment:        PaymentA,
		FromDate:       FromDateA,
		ToDate:         ToDateA,
		NumberOfGuests: 2,
		Status:         "confirm",
	})

	Db.Model(&Booking{}).Create(&Booking{
		Room:           RoomB,
		Register:       RegisterB,
		Payment:        PaymentB,
		FromDate:       FromDateB,
		ToDate:         ToDateB,
		NumberOfGuests: 3,
		Status:         "confirm",
	})

	Db.Model(&Booking{}).Create(&Booking{
		Room:           RoomC,
		Register:       RegisterC,
		Payment:        PaymentC,
		FromDate:       FromDateC,
		ToDate:         ToDateC,
		NumberOfGuests: 1,
		Status:         "unconfirm",
	})
}
