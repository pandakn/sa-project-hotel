import React from 'react'
import { Outlet } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from '@mui/material';

function Home() {
  return (
    <div>
      {/* <Outlet /> */}
      <div >
        <img src="https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80" alt="" />
      </div>
    </div>
  )
}

export default Home