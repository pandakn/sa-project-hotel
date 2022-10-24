package main

import (
	"github.com/gin-gonic/gin"
	"github.com/pandakn/sa-65-example/controller"
	"github.com/pandakn/sa-65-example/entity"
	"github.com/pandakn/sa-65-example/middlewares"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	entity.SetupDatabase()
	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			// Room Routes
			r.GET("/rooms", controller.ListRooms)
			r.GET("/room/:id", controller.GetRoom)
			r.POST("/rooms", controller.CreateRoom)

			// RoomType Routes
			r.GET("/room-type/:id", controller.GetRoomType)
			r.GET("/room-types", controller.ListRoomTypes)

			// RoomZone Routes
			r.GET("/room-zone/:id", controller.GetRoomZone)
			r.GET("/room-zones", controller.ListRoomZones)

			// Admin Routes
			r.GET("/admin/:id", controller.GetAdmin)
			r.GET("/admins", controller.ListAdmins)

			//Department
			r.GET("/depts", controller.ListDepts)
			r.GET("/dept/:id", controller.GetDept)

			//Position
			r.GET("/posts", controller.ListPosts)
			r.GET("/post/:id", controller.GetPost)

			//Salary
			r.GET("/salaries", controller.ListSalaries)
			r.GET("/salary/:id", controller.GetSalary)

			// Employee
			r.GET("/employees", controller.ListEmps)
			r.GET("/employee/:id", controller.GetEmployee)
			r.POST("/employees", controller.CreateEmployee)

			// Booking Routes
			r.GET("/bookings", controller.GetBookings)
			r.GET("/booking/:id", controller.GetBookingByID)
			r.POST("/create_booking", controller.CreateBooking)

			// Register Routes
			r.GET("/user/:id", controller.GetUserByID)
			r.GET("/users", controller.GetUsers)

			// Payment Routes
			r.GET("/payment/:id", controller.GetPaymentByID)
			r.GET("/payments", controller.GetPayments)

			// / CheckOut Routes
			r.GET("/checkouts", controller.ListCheckOuts)
			r.GET("/check/:id", controller.GetCheckOut)
			r.POST("/checkouts", controller.CreateCheckOut)

			// Fine Routes
			r.GET("/fine/:id", controller.GetFine)
			r.GET("/fines", controller.ListFines)

			// CheckIn Routes
			r.GET("/checkins", controller.ListCheckIns)
			r.GET("/checkin/:id", controller.GetCheckIn)
			r.POST("/checkins", controller.CreateCheckIns)

			// ExtraBed Routes
			r.GET("/extrabeds", controller.ListExtraBeds)
			r.GET("/extrabeds/:id", controller.GetExtraBed)

			// ExtraService Routes
			r.GET("/extraservices", controller.ListExtraServices)
			r.GET("/extraservice/:id", controller.GetExtraService)
		}
	}

	// login User Route
	r.POST("/login", controller.Login)
	r.POST("/user-login", controller.UserLogin)

	// Run the server
	r.Run()
}
