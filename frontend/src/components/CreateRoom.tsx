import React, { useEffect, useState } from "react";
import { RoomsInterface } from "../models/IRoom";
import { RoomTypesInterface } from "../models/IRoomTypes";
import { RoomZonesInterface } from "../models/IRoomZones";
import { AdminInterface } from "../models/IAdmins";

import {
  GetAdminByID,
  GetRoomTypes,
  GetRoomZones,
  CreateRooms,
} from "../services/HttpClientService";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateRoom() {
  const [room, setRoom] = useState<RoomsInterface>({});
  const [roomZone, setRoomZone] = useState<RoomZonesInterface[]>([]);
  const [roomType, setRoomType] = useState<RoomTypesInterface[]>([]);
  const [admin, setAdmin] = useState<AdminInterface>({ Name: "" });
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

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof room;
    setRoom({
      ...room,
      [name]: event.target.value,
    });
  };

  const fetchRoomTypes = async () => {
    const res = await GetRoomTypes();
    res && setRoomType(res);
  };

  const fetchRoomZones = async () => {
    const res = await GetRoomZones();
    res && setRoomZone(res);
  };

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    room.AdminID = res.ID;
    res && setAdmin(res);
  };

  useEffect(() => {
    fetchRoomTypes();
    fetchRoomZones();
    fetchAdminByID();
  }, []);

  // console.log(room);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const submit = async () => {
    let data = {
      RoomZoneID: convertType(room.RoomZoneID),
      RoomTypeID: convertType(room.RoomTypeID),
      AdminID: convertType(room.AdminID),
      RoomNumber: room.RoomNumber,
    };

    let res = await CreateRooms(data);
    res ? setSuccess(true) : setError(true);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          ml: 10,
        }}
      >
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Snackbar
            open={success}
            autoHideDuration={1000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              ??????????????????????????????????????????????????????
            </Alert>
          </Snackbar>

          <Snackbar
            open={error}
            autoHideDuration={1000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="error">
              ???????????????????????????????????????????????????????????????
            </Alert>
          </Snackbar>

          <Typography
            variant="h4"
            style={{ textAlign: "center", color: "#333" }}
          >
            ?????????????????????
          </Typography>
          <hr style={{ width: "200px", opacity: "0.5" }} />

          {/* Room Number and Room Zone */}
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              flexGrow: 1,
              mt: 4,
            }}
          >
            <Box
              sx={{
                width: "300px",
              }}
            >
              <TextField
                required
                type="string"
                fullWidth
                id="roomNumber"
                label="?????????????????????????????????"
                value={room.RoomNumber}
                onChange={(e) => {
                  console.log(e.target.value);
                  setRoom({
                    ...room,
                    RoomNumber: e.target.value,
                  });
                }}
              />
            </Box>

            {/* Room zone */}
            <Box
              sx={{
                width: "320px",
              }}
            >
              <Select
                required
                native
                fullWidth
                id="roomZone"
                // label="??????????????????????????????"
                value={room.RoomZoneID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoomZoneID",
                }}
              >
                <option aria-label="None" value="">
                  ????????????????????????????????????????????????????????????
                </option>
                {roomZone.map((item: RoomZonesInterface) => (
                  <option key={item.ID} value={item.ID}>
                    {item.Description}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>

          {/* Room Type and Admin */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              mt: 4,
            }}
          >
            {/* Room Type */}
            <Box
              sx={{
                width: "70%",
              }}
            >
              <Select
                required
                native
                fullWidth
                id="roomType"
                // label="???????????????????????????????????????"
                value={room.RoomTypeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoomTypeID",
                }}
              >
                <option aria-label="None" value="">
                  ?????????????????????????????????????????????????????????????????????
                </option>
                {roomType.map((item) => (
                  <option key={item.ID} value={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Admin */}
            <Box sx={{ width: "70%" }}>
              <TextField
                fullWidth
                disabled
                id="admin"
                label="?????????????????????????????????"
                // defaultValue={admin.Name}
                value={admin.Name}
              />
            </Box>
          </Box>

          {/* Btn submit */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              style={{ fontSize: "1rem" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              ???????????????????????????????????????
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default CreateRoom;
