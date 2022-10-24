import React, { useState, useEffect } from "react";
import { BookingInterface } from "../modelsBooking/IBooking";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { MuiDateRangePicker } from "./MuiDateRangePicker";
import NumberOfGuests from "./NumberOfGuests";
import RoomAvailable from "./RoomAvailable";
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";

import { RoomsInterface } from "../models/IRoom";
import { GetRooms, GetRoomTypes } from "../services/HttpClientService";

import ShowRoom from "./ShowRoom";
import PaymentConfirmation from "./PaymentConfirmation";
import { Dayjs } from "dayjs";

// type Prop = {
//   type: string;
// };

const Booking = () => {
  const [booking, setBooking] = useState<BookingInterface>({});
  const [room, setRoom] = useState<Partial<RoomsInterface[]>>([]);
  const [date, setDate] = React.useState<DateRange<Dayjs | Date>>([null, null]);

  console.log(date);
  console.log(booking);

  const fetchRooms = async () => {
    let res = await GetRooms();
    setRoom(res);
    console.log(res);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof booking;
    console.log(event.target.name);
    console.log(event.target.value);
    setBooking({
      ...booking,
      [name]: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        marginTop: "2rem",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {/* <MuiDateRangePicker /> */}
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: "Check-in", end: "Check-out" }}
        >
          <DateRangePicker
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        {/* <NumberOfGuests /> */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="NumberOfGuests">Number of Guests</InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              id="NumberOfGuests"
              value={booking.NumberOfGuests + ""}
              label="GuestNums"
              style={{ width: "180px" }}
              onChange={handleChange}
              inputProps={{
                name: "NumberOfGuests",
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <Select
            native
            fullWidth
            id="RoomNumber"
            value={booking.Room?.RoomNumber}
            style={{ width: "180px" }}
            onChange={handleChange}
            inputProps={{
              name: "RoomNumber",
            }}
          >
            <option aria-label="None" value="">
              ห้องพัก
            </option>
            {room
              .filter((item) => {
                return item?.Status === false;
              })
              .map((item, idx) => (
                <option key={item?.ID} value={item?.ID}>
                  {item?.RoomNumber}
                </option>
              ))}
          </Select>
        </Box>
        {/* <Link
          to="payment"
          style={{
            border: "1px solid",
            padding: "16px",
            textDecoration: "none",
            textTransform: "uppercase",
            color: "#0072E5",
          }}
        >
          Book Now
        </Link> */}
      </Box>

      <Box sx={{ flexGrow: "1", margin: "1rem auto" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {room
            .filter((item) => {
              return item?.Status === false;
            })
            .map((item) => (
              <Grid item xs={2} sm={4} md={4} key={item?.ID}>
                <ShowRoom
                  key={item?.ID}
                  roomNumber={item?.RoomNumber!}
                  title={item?.RoomType?.Name!}
                  price={item?.RoomType?.Price!}
                  bed={item?.RoomType?.Bed!}
                  size={item?.RoomType?.RoomSize!}
                  img={item?.RoomType?.CoverImage + ""}
                  description={item?.RoomZone?.Description!}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Booking;
