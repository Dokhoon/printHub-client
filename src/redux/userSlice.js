import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register User
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users", formData);
      return res.data; 
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to register";
      return rejectWithValue({ error: message });
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      // Save to localStorage
      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to login";
      return rejectWithValue({ error: message });
    }
  }
);

// Load user from localStorage
const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.message = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "Failed to register";
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user; // Correctly store user object
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "Failed to login";
    });
  },
});

export const { logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
