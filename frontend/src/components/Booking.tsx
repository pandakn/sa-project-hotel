import React, { useState, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import { MuiDateRangePicker } from "./MuiDateRangePicker";
import NumberOfGuests from "./NumberOfGuests";
import RoomAvailable from "./RoomAvailable";
import { Link } from "react-router-dom";

import { RoomsInterface } from "../models/IRoom";
import { GetRooms, GetRoomTypes } from "../services/HttpClientService";

import ShowRoom from "./ShowRoom";

// type Prop = {
//   type: string;
// };

const Booking = () => {
  const [room, setRoom] = useState<Partial<RoomsInterface[]>>([]);

  const fetchRooms = async () => {
    let res = await GetRooms();
    setRoom(res);
    console.log(res);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // room.filter((item) => {
  //   item?.room?.Name === "Delux" && console.log(item?.RoomNumber);
  // });
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
        <MuiDateRangePicker />
        <NumberOfGuests />
        <Link
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
        </Link>
      </Box>

      <Box sx={{ flexGrow: "1", margin: "1rem auto" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 9 }}
        >
          {room.map((item) => (
            <Grid item xs={2} sm={3} md={3} key={item?.ID}>
              <ShowRoom
                key={item?.ID}
                title={item?.RoomType?.Name!}
                price={item?.RoomType?.Price!}
                bed={item?.RoomType?.Bed!}
                size={item?.RoomType?.RoomSize!}
                img={item?.RoomType?.CoverImage + ""}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Booking;
