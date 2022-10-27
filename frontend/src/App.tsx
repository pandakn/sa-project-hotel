import React, { useState, useEffect } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

import Admin from "./routes/Admin";
import User from "./routes/User";
import Home from "./components/Home";
import CreateRoom from "./components/CreateRoom";
import CreateEmployee from "./components/CreateEmployee";
import CheckInIndex from "./components/CheckInIndex";
import CheckOut from "./components/CheckOut";
import Register from "./components/Register";
import DashBoard from "./components/DashBoard";
import Confirm from "./components/Confirm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<User />}></Route>
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<DashBoard />} />
        <Route path="create-room" element={<CreateRoom />} />
        <Route path="create-employee" element={<CreateEmployee />} />
        <Route path="check-in" element={<CheckInIndex />} />
        <Route path="check-out" element={<CheckOut />} />
        <Route path="confirmation" element={<Confirm />} />
      </Route>
    </Routes>
  );
}

export default App;
