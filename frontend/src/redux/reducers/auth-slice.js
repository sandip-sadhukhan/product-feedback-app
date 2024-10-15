import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: null,
  isLoading: true,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    authFailed: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  }
})

export const {loadFeedbacks, setLoading} = feedbackSlice.actions;

export default feedbackSlice.reducer;
