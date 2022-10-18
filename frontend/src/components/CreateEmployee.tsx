import React from "react";
import logo from "./logo.svg";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from '@mui/material/Button';

function App() {
  // =========================(post)====================================================
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  // =========================(Date)====================================================
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));

  return (
    <div>
      <Container maxWidth="md" sx={{ marginTop: 5 ,ml:50}}>
        <Paper
          elevation={4}
          sx={{
            marginBottom: 2,
            marginTop: 2,
            padding: 1,
            paddingX: 2,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <AddCircleOutlineIcon
            fontSize="large"
            sx={{ marginRight: 2, marginTop: 1.8, color: "#6b7176" }}
          />
          <h4 style={{ color: "#6b7176" }}>Add Employee</h4>
        </Paper>
        <form>
          <Paper
            variant="outlined"
            sx={{ padding: 2, paddingTop: 1, marginBottom: 8 }}
          >
            <Grid container spacing={2}>
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>First name</p>
                <TextField
                  id="outlined-required"
                  label="ชื่อ"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              {/*==================================================================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Last name</p>
                <TextField
                  id="outlined-required"
                  label="สกุล"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              {/*========================================(Gender)=========================================================*/}
              <Grid
                xs={6}
                md={6}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <FormLabel
                  sx={{
                    marginRight: 5,
                    fontSize: 17,
                  }}
                >
                  Gender:
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Grid>
              {/*===============================================(Age)===================================================*/}
              <Grid
                xs={6}
                md={4}
                sx={{ display: "flex", alignItems: "center", paddingRight: 18 }}
              >
                <FormLabel sx={{ marginRight: 2, fontSize: 17 }}>
                  Age:
                </FormLabel>
                <TextField
                  id="outlined-number"
                  type="number"
                  fullWidth
                  onChange={(event) =>
                    Number(event.target.value) <= 0
                      ? (event.target.value = "1")
                      : event.target.value
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            {/*===========================================(Phone)=======================================================*/}
            <Grid container spacing={1}>
              <Grid
                xs={12}
                md={7}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <FormLabel sx={{ marginRight: 6, fontSize: 17 }}>
                  Phone:
                </FormLabel>
                <TextField
                  id="outlined-basic"
                  label="โทรศัพท์"
                  variant="outlined"
                />
              </Grid>
              {/*==============================================(Addresss)====================================================*/}
              <Grid
                xs={12}
                md={9}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <FormLabel sx={{ marginRight: 4.5, fontSize: 17 }}>
                  Address:
                </FormLabel>
                <TextField
                  id="outlined-basic"
                  label="ที่อยู่"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              {/*=======================================(select Position)===========================================================*/}
              <Grid
                xs={12}
                md={9}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <FormLabel
                  id="demo-simple-select-helper-label"
                  sx={{ marginRight: 5, fontSize: 17, paddingBottom: 2 }}
                >
                  Position:
                </FormLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                  choose an employee position
                </FormHelperText>
              </Grid>
              {/*=======================================(select Department)===========================================================*/}
              <Grid
                xs={12}
                md={8}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <FormLabel
                  id="demo-simple-select-helper-label"
                  sx={{ marginRight: 1.5, fontSize: 17, paddingBottom: 2 }}
                >
                  Department:
                </FormLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                  choose an employee position
                </FormHelperText>
              </Grid>
              {/*=======================================(Date)===========================================================*/}

              <Grid
                xs={12}
                md={8}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <FormLabel
                  id="demo-simple-select-helper-label"
                  sx={{ marginRight: 8, fontSize: 17, paddingBottom: 2 }}
                >
                  Date:
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    label="เลือกวันที่"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                container
                xs={12}
                md={12}
                sx={{ justifyContent: "center", margin: 1 }}
              >
                 <Button variant="contained" size ="large">INSERT</Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Container>
    </div>
  );
}

export default App;
