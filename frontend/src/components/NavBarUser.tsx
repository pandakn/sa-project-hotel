import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const NavBarUser = () => {

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        bgcolor: "#f5f5f5",
        color: "#000000",
      }}>
        <Toolbar sx={{margin: "0 8rem"}}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Hotel
          </Typography>
          <Button color="inherit" onClick={Logout}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBarUser;