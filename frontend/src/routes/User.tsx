import React, { useEffect, useState } from "react";
import { RoomsInterface } from "../models/IRoom";
import { RoomTypesInterface } from "../models/IRoomTypes";

import MediaCard from "../components/MediaCard";

import { GetRoomTypes } from "../services/HttpClientService";

import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function User() {
  const [roomTypes, setRoomTypes] = useState<Partial<RoomTypesInterface[]>>([]);

  const fetchRooms = async () => {
    let res = await GetRoomTypes();
    setRoomTypes(res);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  console.log(roomTypes);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          overflow: "hidden",
          // bgcolor: "#f5f5f5"
          // filter: "blur(8px)"
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          {roomTypes.map((item) => (
            <MediaCard
              key={item?.ID}
              title={item?.Name!}
              price={item?.Price!}
              bed={item?.Bed!}
              size={item?.RoomSize!}
              img={item?.CoverImage + ""}
            />
          ))}
        </Box>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<KeyboardBackspaceIcon />}
            style={{
              textTransform: "capitalize",
              marginTop: "2rem",
              fontSize: "1rem",
              borderRadius: 20,
              backgroundColor: "#3e8af7",
              padding: "18px 36px",
              // fontSize: "18px",
            }}
          >
            Back
          </Button>
        </Link>
      </Box>
    </div>
  );
}

export default User;
