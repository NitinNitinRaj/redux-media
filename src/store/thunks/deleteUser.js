import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUser = createAsyncThunk("users/delete", async (user) => {
  axios.delete("http://localhost:3005/users/" + user.id);
  return user;
});
