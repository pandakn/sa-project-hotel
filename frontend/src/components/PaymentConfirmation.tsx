import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="ชื่อ-นามสกุล" variant="outlined" />
      <TextField id="outlined-basic" label="เบอร์โทร" variant="outlined" />
      <TextField
        id="outlined-basic"
        label="วันและเวลาที่โอน"
        variant="outlined"
      />
      <TextField id="outlined-basic" label="จำนวนเงิน" variant="outlined" />
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Box>
  );
}
