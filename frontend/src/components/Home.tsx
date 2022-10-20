import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./Home.css"

// import image
import homeBg from "../assets/images/home.jpg";

function Home() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          height: "100vh",
          overflow: "hidden",
          backgroundSize: "cover",
          color: "#f5f5f5",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${homeBg})`,
        }}
      >
        <Typography
          className="animation"
          variant="h1"
        >
          Welcome to Hotel
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <Button variant="contained" startIcon={<AccountCircleIcon />}>
            <Link
              to="user"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "1.2rem",
              }}
            >
              User
            </Link>
          </Button>
          <Button variant="contained" startIcon={<AdminPanelSettingsIcon />}>
            <Link
              to="admin"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "1.2rem",
              }}
            >
              Admin
            </Link>
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
