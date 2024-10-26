import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: null,
  isLoading: true,
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    authFailed: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
    },
  }
})

export const {authFailed, authSuccess} = authSlice.actions;

export default authSlice.reducer;
