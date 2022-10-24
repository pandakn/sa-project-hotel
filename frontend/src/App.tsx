import React, { useState, useEffect } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

import Index from "./routes/Index";
import Admin from "./routes/Admin";
import User from "./routes/User";
import Login from "./components/SignIn";
import CreateRoom from "./components/CreateRoom";
import CreateEmployee from "./components/CreateEmployee";
import Booking from "./components/Booking";
import PaymentConfirmation from "./components/PaymentConfirmation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/booking" element={<Booking />} />
      <Route path="/user/booking/payment" element={<PaymentConfirmation />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="create-room" element={<CreateRoom />} />
        <Route path="create-employee" element={<CreateEmployee />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
