import React, { useState, useEffect } from "react";
import { BookingInterface } from "../modelsBooking/IBooking";
import { PaymentsInterface } from "../modelsBooking/IPayment";
import { GetPayments, GetUserByID } from "../services/HttpClientService";
import SendIcon from "@mui/icons-material/Send";

import qrCode from "../assets/images/qrcode_payment.jpg";

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
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { RoomsInterface } from "../models/IRoom";
import { RegisterInterface } from "../modelsRegister/IRegister";
import {
  GetRooms,
  UpdateRoomStatus,
  CreatePayment,
} from "../services/HttpClientService";

import ShowRoom from "./ShowRoom";
import { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";

// type Prop = {
//   type: string;
// };

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const apiUrl = "http://localhost:8080";

const Booking = () => {
  const [booking, setBooking] = useState<BookingInterface>({});
  const [payment, setPayment] = useState<Partial<PaymentsInterface>>({});
  const [room, setRoom] = useState<Partial<RoomsInterface[]>>([]);
  const [date, setDate] = React.useState<DateRange<Dayjs | Date>>([null, null]);
  const [user, setUser] = useState<RegisterInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [roomStatus, setRoomStatus] = useState(1);
  const [datePayment, setDatePayment] = useState<Date>(new Date());

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const fetchRooms = async () => {
    let res = await GetRooms();
    setRoom(res);
  };

  const fetchAdminByID = async () => {
    let res = await GetUserByID();
    booking.RegisterID = res.ID;
    console.log("user id", res);
    if (res) {
      setUser(res);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchAdminByID();
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

  const submit = async () => {
    let dataPayment = {
      DateTime: datePayment,
      Amount: Number(payment.Amount),
    };

    let resPayment = await CreatePayment(dataPayment);

    if (resPayment) {
      console.log("resPayment payment", resPayment.ID);

      let data = {
        RoomID: Number(booking.RoomID),
        RegisterID: Number(booking.RegisterID),
        PaymentID: resPayment.ID,
        FromDate: date[0],
        ToDate: date[1],
        // FromDate: "2022-09-01T00:00:00+07:00",
        // ToDate: "2022-09-01T00:00:00+07:00",
        NumberOfGuests: Number(booking.NumberOfGuests),
        Status: "confirm",
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      fetch(`${apiUrl}/create_booking`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.data) {
            setSuccess(true);
          } else {
            setError(true);
          }
        });

      UpdateRoomStatus(roomStatus, data.RoomID);
      window.location.reload();
    } else {
      return;
    }
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
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: "Check-in", end: "Check-out" }}
        >
          <DateRangePicker
            value={date}
            onChange={(newValue: any) => {
              setDate(newValue);
            }}
            renderInput={(startProps: any, endProps: any) => (
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
              name: "RoomID",
            }}
          >
            <option aria-label="None" value="">
              ห้องพัก
            </option>
            {room
              .filter((item) => {
                return item?.Status === 0;
              })
              .map((item, idx) => (
                <option key={item?.ID} value={item?.ID}>
                  {item?.RoomNumber}
                </option>
              ))}
          </Select>
        </Box>
      </Box>

      <Box sx={{ flexGrow: "1", margin: "1rem auto" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {room
            .filter((item) => {
              return item?.Status === 0;
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
        {/* <PaymentConfirmation /> */}
        <Box
          component="form"
          sx={{
            m: 1,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "7rem",
          }}
        >
          <img
            src={qrCode}
            alt="qrCOde"
            style={{
              width: "250px",
              padding: "30px",
            }}
          />
          {/* <PaymentDatetimePicker /> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              gap: "30px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="วันและเวลาที่โอน"
                value={datePayment}
                onChange={(newValue: any) => {
                  setDatePayment(newValue);
                }}
              />
            </LocalizationProvider>
            <TextField
              id="Amount"
              label="จำนวนเงิน(บาท)"
              value={payment.Amount}
              onChange={(e: any) => {
                console.log(e.target.value);
                setPayment({
                  ...payment,
                  Amount: e.target.value,
                });
              }}
              style={{
                width: "266px",
                height: "56",
              }}
            />
            <Button
              variant="contained"
              onClick={submit}
              style={{
                width: "200px",
                height: "60px",
                marginLeft: "35px",
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Booking;
