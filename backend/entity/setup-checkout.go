package entity

import (
	"time"
)

func LoadCheckOut() {

	//Fine---------------------------------------------------------
	FineA := Fine{
		Fine_Choice: "เสียค่าปรับ",
	}
	Db.Model(&Fine{}).Create(&FineA)

	FineB := Fine{
		Fine_Choice: "ไม่เสียค่าปรับ",
	}
	Db.Model(&Fine{}).Create(&FineB)

	//CheckOut-----------------------------------------------------
	CheckOutDateA := time.Date(2021, time.October, 05, 25, 45, 35, 0, time.Local) //day, hour, min, sec
	CheckOutDateB := time.Date(2022, time.October, 05, 25, 45, 35, 0, time.Local)
	Db.Model(&CheckOut{}).Create(&CheckOut{
		Admin:        AdminA,
		Booking:      BookA,
		Fine:         FineA,
		CheckOutTime: CheckOutDateA,
		Price:        3700.00,
	})

	Db.Model(&CheckOut{}).Create(&CheckOut{
		Admin:        AdminA,
		Booking:      BookB,
		Fine:         FineB,
		CheckOutTime: CheckOutDateB,
		Price:        0,
	})

}
