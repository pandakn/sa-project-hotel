import React, { useState, useEffect } from "react";
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import { DepartmentInterface } from "../modelsEmpoyee/IDepartment";
import { EmployeeInterface } from "../modelsEmpoyee/IEmployee";
import { PositionInterface } from "../modelsEmpoyee/IPosition";
import { AdminInterface } from "../models/IAdmins";
import { GetAdminByID } from "../services/HttpClientService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  // =========================(Use State)====================================================

  const [emp, setEmp] = useState<EmployeeInterface>({});
  const [dept, setDept] = useState<DepartmentInterface[]>([]);
  const [post, setPost] = useState<PositionInterface[]>([]);
  const [admin, setAdmin] = useState<Partial<AdminInterface>>({ Name: "" });

  const [first, setFirst] = useState<String>("");
  const [last, setLast] = useState<String>("");
  const [gender, setGender] = useState<String>("");
  const [age, setAge] = useState<number>(0);
  const [phone, setPhone] = useState<String>("");
  const [address, setAddress] = useState<String>("");
  const [date, setDate] = React.useState<Date | null>(new Date());

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // =========================(handleClose)====================================================

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  // =========================(HandleChange)====================================================

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof emp;
    console.log(event.target.name);
    console.log(event.target.value);
    setEmp({
      ...emp,
      [name]: event.target.value,
    });
    console.log(emp.PositionID);
    console.log(emp);
  };

  // =========================(Fetch API)====================================================

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const fetchDepartment = async () => {
    fetch(`${apiUrl}/depts`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setDept(result.data);
      });
  };
  const fetchPosition = async () => {
    fetch(`${apiUrl}/posts`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setPost(result.data);
      });
  };

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    emp.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };

  useEffect(() => {
    fetchDepartment();
    fetchPosition();
    fetchAdminByID();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const submit = () => {
    let data = {
      Name: `${first} ${last}`,
      Gender: gender,
      Age: age,
      Contact: phone,
      Address: address,
      Date_IN: date,
      AdminID: emp.AdminID,
      DepartmentID: convertType(emp.DepartmentID),
      PositionID: convertType(emp.PositionID),
    };
    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/employees`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ marginTop: 6 }}>
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
            sx={{ padding: 2, paddingTop: 1, marginBottom: 2 }}
          >
            <Grid container spacing={2}>
              {/*============================================(First name)======================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>First name</p>
                <TextField
                  id="Name"
                  type="string"
                  label="ชื่อ"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => {
                    setFirst(event.target.value);
                  }}
                />
              </Grid>
              {/*=============================================(Last name)=====================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Last name</p>
                <TextField
                  id="Name"
                  type="string"
                  label="สกุล"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(event) => {
                    setLast(event.target.value);
                  }}
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
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
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
                  required
                  onChange={(event) => {
                    if (Number(event.target.value) < 0) {
                      return (event.target.value = "0");
                    } else {
                      setAge(Number(event.target.value));
                      return event.target.value;
                    }
                  }}
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
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
                  required
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  inputProps={{ maxLength: 10 }}
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
                  required
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
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
                  required
                  id="post"
                  value={emp.PositionID + ""}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{
                    name: "PositionID",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {post.map((item) => (
                    <MenuItem key={item.ID} value={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
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
                  // labelId="demo-simple-select-helper-label"
                  id="DeptID"
                  value={emp.DepartmentID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "DepartmentID",
                  }}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {dept.map((item) => (
                    <MenuItem key={item.ID} value={item.ID}>
                      {item.DeptName}
                    </MenuItem>
                  ))}
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="เลือกวันและเวลา"
                    renderInput={(params) => <TextField {...params} />}
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                container
                xs={12}
                md={12}
                sx={{ justifyContent: "center", margin: 1 }}
              >
                <Button variant="contained" size="large" onClick={submit}>
                  INSERT
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Container>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
