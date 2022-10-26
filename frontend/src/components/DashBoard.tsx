import Box from "@mui/material/Box";

function DashBoard() {
  return (
    <Box
      sx={{
        marginLeft: "8rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>ระบบโรงแรม</h1>
      <img src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80" style={{width: "800px"}}/>
    </Box>
  );
}

export default DashBoard;
