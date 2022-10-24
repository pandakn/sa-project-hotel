import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormControl, Select, SelectChangeEvent } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AdminInterface } from "../models/IAdmins";
import { BookingInterface } from "../modelsBooking/IBooking";
import { ExtraBedInterface } from "../modelsCheckIn/IExtraBed";
import { ExtraServiceInterface } from "../modelsCheckIn/IExtraService";
import { CheckInInterface } from "../modelsCheckIn/ICheckIn";
import { GetAdminByID } from '../services/HttpClientService';



function CheckInIndex() {


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  const [date, setDate] = React.useState<Date | null>(null);

  // Fetch API
  const apiUrl = "http://localhost:8080";
  const [checkin, setCheckIn] = useState<Partial<CheckInInterface>>({});
  const [extraService, setExtraService] = useState<ExtraServiceInterface[]>([]);
  const [extraBed, setExtraBed] = useState<ExtraBedInterface[]>([]);
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const [admin, setAdmin] = useState<AdminInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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

  const fetchExtraService = async () => {
    fetch(`${apiUrl}/extraservices`)
      .then(response => response.json())
      .then(res => {
        setExtraService(res.data);
      })
  }

  const fetchExtraBed = async () => {
    fetch(`${apiUrl}/extrabeds`)
      .then(response => response.json())
      .then(res => {
        setExtraBed(res.data);
      })
  }

  const fetchBooking = async () => {
    fetch(`${apiUrl}/bookings`)
      .then(response => response.json())
      .then(res => {
        setBooking(res.data);
      })
  }

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    checkin.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };

  useEffect(() => {
    fetchAdminByID();
    fetchExtraBed();
    fetchExtraService();
    fetchBooking();
  }, []);

  const handleChange = (
    event: SelectChangeEvent<number>
  ) => {
    const name = event.target.name as keyof typeof checkin;
    setCheckIn({
      ...checkin,
      [name]: event.target.value
    });
  };

  const submit = () => {
    let data = {
      CheckInDate: date,
      ExtraBedID: Number(checkin.ExtraBedID),
      ExtraServiceID: Number(checkin.ExtraServiceID),
      AdminID: checkin.AdminID,
      BookingID: Number(checkin.BookingID),
    };
    console.log(data.AdminID);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/checkins`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  };

    return (<div>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Box
            display={"flex"}
            sx={{
              marginTop: 3,
              marginX: 4,
            }
            }>
            <h1>Check-In</h1>
            <h1><CheckCircleOutlineIcon fontSize="large" color="success" sx={{ marginX: 1 }} /></h1>
          </Box>
          <hr />
          <Grid container spacing={2} sx={{ padding: 3 }}>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>หมายเลขการจอง</p>
                <Select
                  native
                  value={checkin.BookingID}
                  onChange={handleChange}
                  inputProps={{
                    name: "BookingID",
                  }}
                >
                  <option aria-label="None" value="">
                    เลือกหมายเลขการจอง
                  </option>
                  {booking.map((item: BookingInterface) => (
                    <option value={item.ID}>{item.ID}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
              <p>จำนวนเตียงเสริม</p>
                <Select
                  native
                  value={checkin.ExtraBedID}
                  onChange={handleChange}
                  inputProps={{
                    name: "ExtraBedID",
                  }}
                >
                  <option aria-label="None" value="">
                    เลือกจำนวนเตียงเสริม
                  </option>
                  {extraBed.map((item: ExtraBedInterface) => (
                    <option value={item.ID}>{item.Amount}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
            <p>บริการเสริม</p>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={checkin.ExtraServiceID}
                  onChange={handleChange}
                  inputProps={{
                    name: "ExtraServiceID",
                  }}
                >
                  <option aria-label="None" value="">
                    เลือกบริการเสริม
                  </option>
                  {extraService.map((item: ExtraServiceInterface) => (
                    <option value={item.ID}>{item.Type}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant='outlined'>
              <p>วันที่ Check-In</p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={date}
                    onChange={(date) => {
                      setDate(date);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

       
            <Grid item xs={12}>
              <Button variant="contained" color="success" size="large" onClick={submit} sx={{ float: "right", marginTop: 3}}>
                ยืนยันการ Check-In
                <AddCircleIcon sx={{ marginX: 1 }} />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
    </div>

    );
  }

  export default CheckInIndex;
