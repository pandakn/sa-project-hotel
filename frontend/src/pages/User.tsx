import React, { useEffect, useState } from "react";
import { RoomsInterface } from "../models/IRoom";
import { RoomTypesInterface } from "../models/IRoomTypes";

import SignIn from "../components/SignIn";

import { UserLogin } from "../services/HttpClientService";

import { GetRoomTypes } from "../services/HttpClientService";

import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import Booking from "../components/Booking";
import NavBarUser from "../components/NavBarUser";

function User() {
  const [roomTypes, setRoomTypes] = useState<Partial<RoomTypesInterface[]>>([]);
  const [token, setToken] = useState<String>("");

  const fetchRooms = async () => {
    let res = await GetRoomTypes();
    setRoomTypes(res);
  };

  useEffect(() => {
    fetchRooms();

    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn signIn={UserLogin} />;
  }

  return (
    <div>
      <NavBarUser />
      <Booking />
    </div>
  );
}

export default User;
