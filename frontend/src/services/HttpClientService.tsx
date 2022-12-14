import { RoomsInterface } from "../models/IRoom";
import { LoginInterface } from "../models/ILogin";
import { PaymentsInterface } from "../modelsBooking/IPayment";

const apiUrl = "http://localhost:8080";

const Login = async (data: LoginInterface) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch("http://localhost:8080/login", requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
};

const UserLogin = async (data: LoginInterface) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch("http://localhost:8080/user-login", requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("uid", res.data.id);
        console.log(res.data);
        return res.data;
      } else {
        return false;
      }
    });

  return res;
};

const requestOptionsGet = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const GetRooms = async () => {
  let res = await fetch(`${apiUrl}/rooms`)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetRoomTypes = async () => {
  let res = await fetch(`${apiUrl}/room-types`)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetRoomZones = async () => {
  let res = await fetch(`${apiUrl}/room-zones`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetPayments = async () => {
  let res = await fetch(`${apiUrl}/payments`, requestOptionsGet)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetAdminByID = async () => {
  const id = localStorage.getItem("uid");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/admin/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const GetUserByID = async () => {
  const id = localStorage.getItem("uid");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/user/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const CreateRooms = async (data: RoomsInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/rooms`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const CreatePayment = async (data: PaymentsInterface) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/payments`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

const UpdateRoomStatus = async (status: number, id: number) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/update-room/${id}/${status}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result.data ? result.data : false;
    });

  return res;
};

export {
  GetAdminByID,
  GetRoomTypes,
  GetRoomZones,
  CreateRooms,
  Login,
  GetRooms,
  UserLogin,
  GetUserByID,
  UpdateRoomStatus,
  CreatePayment,
  GetPayments,
};
