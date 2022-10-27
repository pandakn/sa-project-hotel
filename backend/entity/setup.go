package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var Db *gorm.DB

func DB() *gorm.DB {
	return Db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Room{},
		&Admin{},
		&RoomType{},
		&RoomZone{},
		//Employee
		&Department{},
		&Position{},
		&Salary{},
		&Employee{},
		//Register
		&Register{},
		&Gender{},
		&Status{},
		&Province{},
		//Booking
		&Booking{},
		&Payment{},
		//Check Out
		&Fine{},
		&CheckOut{},
		//Check In
		&ExtraService{},
		&ExtraBed{},
		&CheckIn{},
		// Confirmation
		&Confirmation{},
		&Verify{},
	)

	Db = database

	LoadRoom()
	MockupRegis()
	MockupEmp()
	MockUpBooking()
	LoadCheckOut()
	LoadCheckIn()
	LoadConfirmation()
}
