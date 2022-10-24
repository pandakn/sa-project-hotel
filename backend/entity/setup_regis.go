package entity

import "golang.org/x/crypto/bcrypt"

var RegisterA Register
var RegisterB Register
var RegisterC Register

func MockupRegis() {

	// Gender
	GenderA := Gender{
		Gender: "ชาย",
	}
	Db.Model(&Gender{}).Create(&GenderA)

	GenderB := Gender{
		Gender: "หญิง",
	}
	Db.Model(&Gender{}).Create(&GenderB)

	GenderC := Gender{
		Gender: "ไม่ระบุเพศ",
	}
	Db.Model(&Gender{}).Create(&GenderC)

	// Status
	StatusA := Status{
		Status: "โสด",
	}
	Db.Model(&Status{}).Create(&StatusA)

	StatusB := Status{
		Status: "แต่งงานแล้ว",
	}
	Db.Model(&Status{}).Create(&StatusB)

	StatusC := Status{
		Status: "ไม่ระบุ",
	}
	Db.Model(&Status{}).Create(&StatusC)

	// Province
	ProvinceA := Province{
		Province: "กทม.",
	}
	Db.Model(&Province{}).Create(&ProvinceA)

	ProvinceB := Province{
		Province: "โคราช",
	}
	Db.Model(&Province{}).Create(&ProvinceB)

	ProvinceC := Province{
		Province: "พิจิตร",
	}
	Db.Model(&Province{}).Create(&ProvinceC)

	// Register(main)
	passwordA, _ := bcrypt.GenerateFromPassword([]byte("11111111"), 14)
	RegisterA = Register{
		Gender:    GenderA,
		Status:    StatusA,
		Province:  ProvinceA,
		FirstName: "Sakdipat",
		LastName:  "Mujarin",
		Password:  string(passwordA),
		Email:     "Bluetae.20@gmail.com",
	}
	Db.Model(&Register{}).Create(&RegisterA)

	passwordB, _ := bcrypt.GenerateFromPassword([]byte("22222222"), 14)
	RegisterB = Register{
		Gender:    GenderB,
		Status:    StatusB,
		Province:  ProvinceB,
		FirstName: "Lalita",
		LastName:  "Namwong",
		Password:  string(passwordB),
		Email:     "Lali_00@gmail.com",
	}
	Db.Model(&Register{}).Create(&RegisterB)

	passwordC, _ := bcrypt.GenerateFromPassword([]byte("333333333"), 14)
	RegisterC = Register{
		Gender:    GenderC,
		Status:    StatusC,
		Province:  ProvinceC,
		FirstName: "Panita",
		LastName:  "Supap",
		Password:  string(passwordC),
		Email:     "Panita_11@gmail.com",
	}
	Db.Model(&Register{}).Create(&RegisterC)
}
