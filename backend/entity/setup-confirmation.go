package entity

import (
	"time"
)

func LoadConfirmation() {
	// Verify
	VerifyA := Verify{
		VName: "สำเร็จ",
	}
	Db.Model(&Verify{}).Create(&VerifyA)

	VerifyB := Verify{
		VName: "จำนวนเงินไม่ถูกต้อง",
	}
	Db.Model(&Verify{}).Create(&VerifyB)

	//Confirmation
	DateTimeConfirmationA := time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local)
	DateTimeConfirmationB := time.Date(2022, time.September, 01, 13, 23, 44, 0, time.Local)
	ConfirmationA := Confirmation{
		Admin:                AdminA,
		Verify:               VerifyA,
		Payment:              PaymentA,
		DateTimeConfirmation: DateTimeConfirmationA,
	}
	Db.Model(&Confirmation{}).Create(&ConfirmationA)

	ConfirmationB := Confirmation{
		Admin:                AdminB,
		Verify:               VerifyB,
		Payment:              PaymentB,
		DateTimeConfirmation: DateTimeConfirmationB,
	}
	Db.Model(&Confirmation{}).Create(&ConfirmationB)
}
