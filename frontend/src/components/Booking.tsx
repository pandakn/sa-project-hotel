import React from "react";
import { Box, Button } from "@mui/material";
import { MuiDateRangePicker } from "./MuiDateRangePicker";
import NumberOfGuests from "./NumberOfGuests";
import RoomAvailable from "./RoomAvailable";

const Booking = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //   minHeight: "100vh",
        //   minWidth: "100vw",
        overflow: "hidden",
        // border: "1px solid black",
        // margin: "250px",
        height: "100vh",
        gap: 3,
      }}
    >
      <MuiDateRangePicker />
      <NumberOfGuests />
      <RoomAvailable />
      <Button
        variant="contained"
        style={{
          padding: "16px",
        }}
      >
        Book Now
      </Button>
    </Box>
  );
};

export default Booking;
