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
		&Department{},
		&Position{},
		&Salary{},
		&Employee{},
		&Booking{},
		&Payment{},
		&Register{},
	)

	Db = database

	LoadRoom()
	MockupEmp()
	MockUpBooking()
}
