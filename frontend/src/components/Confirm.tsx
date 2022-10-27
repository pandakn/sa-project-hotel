import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  FormControl,
  Select,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";
import { GetAdminByID } from "../services/HttpClientService";
import { AdminInterface } from "../models/IAdmins";
import { ConfirmationInterface } from "../modelsConfirmation/IConfirmation";
import { VerifyInterface } from "../modelsConfirmation/IVerify";
import { PaymentsInterface } from "../modelsBooking/IPayment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Confirm() {
  const apiUrl = "http://localhost:8080";
  const [confirmation, setConfirmation] = useState<
    Partial<ConfirmationInterface>
  >({});
  const [verify, setVerify] = useState<VerifyInterface[]>([]);
  const [payment, setPayment] = useState<PaymentsInterface[]>([]);
  const [admin, setAdmin] = useState<Partial<AdminInterface>>({});
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

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof confirmation;
    setConfirmation({
      ...confirmation,
      [name]: event.target.value,
    });
  };

  //Fetch API
  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    confirmation.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };

  const fetchVerify = async () => {
    fetch(`${apiUrl}/verifies`)
      .then((response) => response.json())
      .then((res) => {
        // console.log("verifies", res.data);
        setVerify(res.data);
      });
  };

  const fetchPayment = async () => {
    fetch(`${apiUrl}/payments`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        setPayment(res.data);
      });
  };

  useEffect(() => {
    fetchVerify();
    fetchPayment();
    fetchAdminByID();
  }, []);

  const submit = () => {
    let data = {
      AdminID: Number(confirmation.AdminID),
      VerifyID: Number(confirmation.VerifyID),
      PaymentID: Number(confirmation.PaymentID),
      DateTimeConfirmation: new Date(),
    };

    console.log("data", data);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/confirmation`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result.data ? setSuccess(true) : setError(true);
      });
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 100 },
    { field: "Amount", headerName: "ราคา(บาท)", width: 100 },
    { field: "DateTime", headerName: "เวลา", width: 500 },
  ];

  return (
    <div>
      <Container maxWidth="md">
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
        <Paper elevation={3}>
          <Box
            display={"flex"}
            sx={{
              marginTop: 2,
              paddingX: 2,
              paddingY: 1,
            }}
          >
            <h1>ตรวจสอบเงิน</h1>
          </Box>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={3.7}></Grid>
            <Grid item xs={5}>
              <FormControl fullWidth variant="outlined">
                {/* <p>หมายเลขการชำระเงิน</p> */}
                <Select
                  native
                  value={confirmation.PaymentID}
                  onChange={handleChange}
                  inputProps={{
                    name: "PaymentID",
                  }}
                >
                  <option aria-label="None" value="">
                    เลือกหมายเลข
                  </option>
                  {payment.map((item: PaymentsInterface) => (
                    <option value={item?.ID!}>{item?.ID!}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3.3}></Grid>
            <div
              style={{
                height: 280,
                width: "100%",
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "36px",
                marginRight: "20px",
              }}
            >
              <h3>รายการจองสถานที่</h3>
              <DataGrid
                rows={payment}
                getRowId={(row) => row.ID}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
            {/* =============================================== */}

            {/* =================================================== */}
            <Grid item xs={4.5}>
              {/* <Item>10/12/2022</Item> */}
            </Grid>
            <Grid item xs={3.5}></Grid>
            {/* ===================================================== */}
            <Grid item xs={3.7}></Grid>
            <Grid item xs={5} marginTop="10px" marginLeft="25px">
              <FormControl fullWidth variant="outlined">
                <p>สถานะการชำระเงิน</p>
                <Select
                  native
                  value={confirmation.VerifyID}
                  onChange={handleChange}
                  inputProps={{
                    name: "VerifyID",
                  }}
                >
                  <option aria-label="None" value="">
                    เลือกสถานะ
                  </option>
                  {verify.map((item: VerifyInterface) => (
                    <option value={item.ID}>{item.VName}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3.3}></Grid>
            {/* ===================================================== */}
            <Grid item xs={4.6}></Grid>
            <Grid item xs={7.4}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              ></Box>
            </Grid>
            {/* ===================================================== */}
            <Grid item xs={5.6}></Grid>
            <Grid item xs={6.4}>
              <Box>
                <Button onClick={submit} variant="contained" size="large">
                  ยืนยัน
                </Button>
              </Box>
            </Grid>
            {/* ===================================================== */}
            <Grid item xs={12}>
              <hr />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
export default Confirm;
