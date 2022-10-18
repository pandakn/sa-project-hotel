import { RoomsInterface } from "../models/IRoom"

const apiUrl = "http://localhost:8080";

const GetAdminByID = async () => {
  const id = localStorage.getItem("uid");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let result = await fetch(`${apiUrl}/admin/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return false;
      }
    }); 

  return result;
};

export { GetAdminByID };
