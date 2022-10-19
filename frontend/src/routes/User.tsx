import React from "react";
import { Link } from "react-router-dom";
import MediaCard from "../components/MediaCard";
import { Box, Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const hotel = [
  {
    title: "standard",
    price: 1000,
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "delux",
    price: 2000,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    title: "suite",
    price: 3000,
    img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
  },
];

function User() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          gap: 5,
          height: "100vh",
        }}
      >
        {hotel.map((item) => (
          <MediaCard title={item.title} price={item.price} img={item.img} />
        ))}
      </Box>
      <Button
        variant="contained"
        startIcon={<KeyboardBackspaceIcon />}
        style={{
          textTransform: "capitalize",
          position: "absolute",
          left: "50%",

          bottom: "8rem",
          transform: "transform: translate(-50%, -50%);",
          fontSize: "1.5rem",
        }}
      >
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Back
        </Link>
      </Button>
    </div>
  );
}

export default User;
