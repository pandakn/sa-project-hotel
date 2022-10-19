package entity

import "golang.org/x/crypto/bcrypt"

func MockUpRoom() {
	passwordA, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	// Admin
	AdminA := Admin{
		Name:     "Natthawut",
		Username: "keemknkx",
		Password: string(passwordA),
	}
	Db.Model(&Admin{}).Create(&AdminA)

	passwordB, _ := bcrypt.GenerateFromPassword([]byte("admin"), 14)
	AdminB := Admin{
		Name:     "admin",
		Username: "admin",
		Password: string(passwordB),
	}
	Db.Model(&Admin{}).Create(&AdminB)

	// RoomType
	RoomTypeA := RoomType{
		Name:     "Standard",
		Price:    690.00,
		Bed:      "1 single bed",
		RoomSize: "25 m^2",
	}
	Db.Model(&RoomType{}).Create(&RoomTypeA)

	RoomTypeB := RoomType{
		Name:     "Delux",
		Price:    1290.00,
		Bed:      "2 single beds",
		RoomSize: "30 m^2",
	}
	Db.Model(&RoomType{}).Create(&RoomTypeB)

	RoomTypeC := RoomType{
		Name:     "Suite",
		Price:    2490.00,
		Bed:      "1 king bed",
		RoomSize: "40 m^2",
	}
	Db.Model(&RoomType{}).Create(&RoomTypeC)

	// RoomZone
	RoomZoneA := RoomZone{
		Zone:        "A",
		Description: "โซน A เป็นโซนที่ใกล้กับสระว่ายน้ำและฟิตเนต",
	}
	Db.Model(&RoomZone{}).Create(&RoomZoneA)

	RoomZoneB := RoomZone{
		Zone:        "B",
		Description: "โซน B จะอยู่ใกล้กับศูนย์อาหาร",
	}
	Db.Model(&RoomZone{}).Create(&RoomZoneB)

	RoomZoneC := RoomZone{
		Zone:        "C",
		Description: "โซน C ใกล้กับสนามหญ้าและโซนของเด็กๆ",
	}
	Db.Model(&RoomZone{}).Create(&RoomZoneC)

	// Room (main entity)
	Db.Model(&Room{}).Create(&Room{
		RoomNumber: "102",
		RoomZone:   RoomZoneA,
		RoomType:   RoomTypeC,
		Admin:      AdminA,
	})
	Db.Model(&Room{}).Create(&Room{
		RoomNumber: "301",
		RoomZone:   RoomZoneB,
		RoomType:   RoomTypeA,
		Admin:      AdminB,
	})
	Db.Model(&Room{}).Create(&Room{
		RoomNumber: "205",
		RoomZone:   RoomZoneC,
		RoomType:   RoomTypeB,
		Admin:      AdminA,
	})
	Db.Model(&Room{}).Create(&Room{
		RoomNumber: "304",
		RoomZone:   RoomZoneA,
		RoomType:   RoomTypeB,
		Admin:      AdminB,
	})
}
