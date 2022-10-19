import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Login from "../components/SignIn";

import CreateRoom from "../components/CreateRoom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";

function Admin() {
  const [token, setToken] = useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <Login />;
  }

  return (
    <>
      <div>
        <Navbar />
        <Sidebar />
      </div>
      <Outlet />
    </>
  );
}

export default Admin;
