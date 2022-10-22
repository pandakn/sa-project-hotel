package entity


func MockupRegis() {

	// Gender
	GenderA := Gender{
		Gender:       "ชาย",
	}
	Db.Model(&Gender{}).Create(&GenderA)

	GenderB := Gender{
		Gender:       "หญิง",
	}
	Db.Model(&Gender{}).Create(&GenderB)

	GenderC := Gender{
		Gender:       "ไม่ระบุเพศ",
	}
	Db.Model(&Gender{}).Create(&GenderC)

	// Status
	StatusA := Status{
		Status:        "โสด",
	}
	Db.Model(&Status{}).Create(&StatusA)

	StatusB := Status{
		Status:        "แต่งงานแล้ว",
	}
	Db.Model(&Status{}).Create(&StatusB)

	StatusC := Status{
		Status:        "ไม่ระบุ",
	}
	Db.Model(&Status{}).Create(&StatusC)

		// Province
		ProvinceA := Province{
			Province:        "กทม.",
		}
		Db.Model(&Province{}).Create(&ProvinceA)
	
		ProvinceB := Province{
			Province:        "โคราช",
		}
		Db.Model(&Province{}).Create(&ProvinceB)
	
		ProvinceC := Province{
			Province:        "พิจิตร",
		}
		Db.Model(&Province{}).Create(&ProvinceC)

		// Register(main)
		Db.Model(&Register{}).Create(&Register{
			Gender: GenderA,
			Status: StatusA,
			Province: ProvinceA ,
			FirstName: "Sakdipat",
			LastName: "Mujarin",
			Password: "11111111",
			Email: "Bluetae.20@gmail.com",
		})

		Db.Model(&Register{}).Create(&Register{
			Gender: GenderB,
			Status: StatusB,
			Province: ProvinceB,
			FirstName: "Lalita",
			LastName: "Namwong",
			Password: "22222222",
			Email: "Lali_00@gmail.com",
		})
	
		Db.Model(&Register{}).Create(&Register{
			Gender: GenderC,
			Status: StatusC,
			Province: ProvinceC,
			FirstName: "Panita",
			LastName: "Supap",
			Password: "333333333",
			Email: "Panita_11@gmail.com",
		})
	
	
}