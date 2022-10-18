import React, { useState, useEffect } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import Index from "./routes/Index";
import Admin from "./routes/Admin";
import Login from "./components/Login";
import Home from "./components/Home";
import Employee from "./components/Employee";
import CreateRoom from "./components/CreateRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="create-room" element={<CreateRoom />} />
        <Route path="employee" element={<Employee />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
