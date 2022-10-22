package entity

import (

	"gorm.io/gorm"
)


type Gender struct {
	gorm.Model
	Gender 		string
	Register    []Register `gorm:"foreignKey:Gender_ID"`

}

type Province  struct {
	gorm.Model
	Province	string
	Register    []Register `gorm:"foreignKey:Province_ID"`
}

type Status struct {
	gorm.Model
	Status string
	Register    []Register `gorm:"foreignKey:Status_ID"`

}

type Register struct {
	gorm.Model
	FirstName  string
	LastName	string
	Password    string
	Email		string	`gorm:"uniqueIndex"`

	Gender_ID *uint
	Gender   Gender

	Province_ID *uint
	Province   Province

	Status_ID *uint
	Status   Status
}
