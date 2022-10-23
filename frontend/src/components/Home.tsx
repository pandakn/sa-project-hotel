import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./Home.css";

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
          width: "100vw",
          overflow: "hidden",
          backgroundSize: "cover",
          color: "#f5f5f5",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${homeBg})`,
          backgroundPosition: "center",
          WebkitBackgroundSize: "cover",
        }}
      >
        <Typography
          className="animation"
          variant="h1"
          style={{ textTransform: "uppercase" }}
        >
          Welcome to Hotel
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <Link
            to="user"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ color: "#333" }} />}
              style={{
                color: "#333",
                borderRadius: 20,
                backgroundColor: "#fff",
                padding: "18px 36px",
                fontSize: "18px",
              }}
            >
              User
            </Button>
          </Link>

          <Link
            to="admin"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="contained"
              startIcon={<AdminPanelSettingsIcon />}
              style={{
                color: "#fff",
                borderRadius: 20,
                backgroundColor: "#393a3c",
                padding: "18px 36px",
                fontSize: "18px",
              }}
            >
              Admin
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
