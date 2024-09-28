import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {
    _id: "",
    name: "",
    email: "",
    role: "",
    exp: "",
    iat: "",
  },
};

// User slice definition
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.token = "";
      state.user = initialState.user;
    },
  },
});

export const { setToken, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
