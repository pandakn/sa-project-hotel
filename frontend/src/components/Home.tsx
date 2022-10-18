import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import image
import homeBg from "../assets/images/home.jpg";

const menu = [
  { name: "User", path: "user"},
  { name: "Admin", path: "admin", icon: <AdminPanelSettingsIcon /> },
];

function Home() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          overflow: "hidden",
          backgroundSize: "cover",
          color: "#f5f5f5",
          backgroundImage: `url(${homeBg})`,
        }}
      >
        {menu.map((item) => {
          return (
            <Stack direction="row" spacing={5}>
            <Button variant="contained" startIcon={<AdminPanelSettingsIcon />}>
            <Link
                to="admin"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                {item.name}
              </Link>
            </Button>

          </Stack>
          );
        })}
      </Box>
    </div>
  );
}

export default Home;
