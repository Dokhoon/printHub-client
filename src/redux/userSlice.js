// redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// --- Async thunk for user registration ---
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users", formData);
      return response.data; // backend returns the created user
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to register";
      return rejectWithValue({ error: message });
    }
  }
);

// --- Async thunk for user login ---
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      return response.data; // backend returns logged in user info + token
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to login";
      return rejectWithValue({ error: message });
    }
  }
);

// --- Slice ---
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "Failed to register";
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error || "Failed to login";
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
