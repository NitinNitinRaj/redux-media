import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk("users/add", async (name) => {
  const response = await axios.post("http://localhost:3005/users", {
    name: name,
  });
  return response.data;
});
