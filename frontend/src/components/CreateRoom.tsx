import React, { useEffect, useState } from "react";
import { RoomsInterface } from "../models/IRoom";
import { RoomTypesInterface } from "../models/IRoomTypes";
import { RoomZonesInterface } from "../models/IRoomZones";
import { AdminInterface } from "../models/IAdmins";
import { GetAdminByID } from "../services/HttpClientService";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Link from "@mui/material/Link";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateRoom() {
  const [room, setRoom] = useState<RoomsInterface>({ RoomNumber: "" });
  const [roomZone, setRoomZone] = useState<RoomZonesInterface[]>([]);
  const [roomType, setRoomType] = useState<RoomTypesInterface[]>([]);
  const [admin, setAdmin] = useState<Partial<AdminInterface>>({ Name: "" });
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

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const fetchRoomTypes = async () => {
    fetch(`${apiUrl}/room-types`)
      .then((response) => response.json())
      .then((result) => {
        setRoomType(result.data);
      });
  };

  const fetchRoomZones = async () => {
    fetch(`${apiUrl}/room-zones`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setRoomZone(result.data);
      });
  };

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    room.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
    fetchRoomZones();
    fetchAdminByID();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const submit = () => {
    let data = {
      RoomZoneID: convertType(room.RoomZoneID),
      RoomTypeID: convertType(room.RoomTypeID),
      AdminID: room.AdminID,
      RoomNumber: room.RoomNumber,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/rooms`, requestOptions)
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

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            mt: 2,
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

          <Typography
            variant="h4"
            style={{ textAlign: "center", color: "#333" }}
          >
            ห้องพัก
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
                label="เลขห้อง"
                value={room.RoomNumber}
                onChange={(e) => {
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
                width: "300px",
              }}
            >
              <Select
                required
                native
                fullWidth
                id="roomZone"
                // label="โซนห้องพัก"
                value={room.RoomZoneID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoomZoneID",
                }}
              >
                <option aria-label="None" value="">
                  โซนห้องพัก
                </option>
                {roomZone.map((item) => (
                  <option key={item.ID} value={item.ID}>
                    {item.Zone}
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
                // label="ประเภทห้องพัก"
                value={room.RoomTypeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoomTypeID",
                }}
              >
                <option aria-label="None" value="">
                  ประเภทห้องพัก
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
                label="เจ้าหน้าที่"
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
              บันทึกห้องพัก
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default CreateRoom;
