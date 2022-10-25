import * as React from "react";
import { useParams, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import PaymentDatetimePicker from "./PaymentDatetimePicker";

import qrCode from "../assets/images/qrcode_payment.jpg"

function PaymentConfirmation() {

  // const location = useLocation()
  // const { RoomNumber } = location.state

  // console.log("Room Number", RoomNumber);
  
  
  return (
    <>
      <Box
        component="form"
        sx={{
          m: 1,
          width: "100%",
          display: "flex",
          // flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
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
        <PaymentDatetimePicker />
        <TextField
          id="filled-read-only-input"
          label="จำนวนเงิน(Bath)"
          defaultValue="Hello World"
          style={{
            width: "266px",
            height: "56",
          }}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        <Button variant="contained" component="label" size="large">
          Upload
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <Button variant="contained" size="large" endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </>
  );
}

export default PaymentConfirmation;