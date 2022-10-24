package entity

import (
	"time"
)

func LoadCheckIn() {

	// ExtraService Section ----------------------
	ExtraServiceA := ExtraService{
		Type:      "ไม่มีบริการเสริม",
		ExtraCost: 0,
	}
	Db.Model(&ExtraService{}).Create(&ExtraServiceA)

	ExtraServiceB := ExtraService{
		Type:      "นวดคลายกล้ามเนื้อ",
		ExtraCost: 1500,
	}
	Db.Model(&ExtraService{}).Create(&ExtraServiceB)

	ExtraServiceC := ExtraService{
		Type:      "อาหารเช้า",
		ExtraCost: 400,
	}
	Db.Model(&ExtraService{}).Create(&ExtraServiceC)

	ExtraServiceD := ExtraService{
		Type:      "อาหารกลางวัน",
		ExtraCost: 400,
	}
	Db.Model(&ExtraService{}).Create(&ExtraServiceD)

	ExtraServiceE := ExtraService{
		Type:      "อาหารเย็น",
		ExtraCost: 400,
	}
	Db.Model(&ExtraService{}).Create(&ExtraServiceE)

	// ExtraBed Section ----------------------
	ExtraBedA := ExtraBed{
		Amount: 0,
		Cost:   0,
	}
	Db.Model(&ExtraBed{}).Create(&ExtraBedA)

	ExtraBedB := ExtraBed{
		Amount: 1,
		Cost:   700,
	}
	Db.Model(&ExtraBed{}).Create(&ExtraBedB)

	ExtraBedC := ExtraBed{
		Amount: 2,
		Cost:   1500,
	}
	Db.Model(&ExtraBed{}).Create(&ExtraBedC)

	// Check-in Section ---------------------- (เป็น Entiry หลัก)
	CheckInDateA := time.Date(2022, time.November, 07, 0, 0, 0, 0, time.Local)
	CheckInDateB := time.Date(2022, time.January, 01, 0, 0, 0, 0, time.Local)

	Db.Model(&CheckIn{}).Create(&CheckIn{
		ExtraService: ExtraServiceA,
		ExtraBed:     ExtraBedA,
		Booking:      BookA,
		Admin:        AdminA,
		CheckInDate:  CheckInDateA,
	})

	Db.Model(&CheckIn{}).Create(&CheckIn{
		ExtraService: ExtraServiceB,
		ExtraBed:     ExtraBedB,
		Booking:      BookB,
		Admin:        AdminB,
		CheckInDate:  CheckInDateB,
	})

}
