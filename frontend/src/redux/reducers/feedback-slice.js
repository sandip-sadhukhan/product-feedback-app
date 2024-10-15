import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  feedbacks: [],
  isLoading: true
}

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    loadFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    }
  }
})

export const {loadFeedbacks, setLoading} = feedbackSlice.actions;

export default feedbackSlice.reducer;
