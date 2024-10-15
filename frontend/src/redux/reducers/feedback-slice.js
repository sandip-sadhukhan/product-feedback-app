import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  feedbacks: [],
  isLoading: true,
  roadmapBox: {
    isLoading: true,
    data: {
      Planned: 0,
      'In-Progress': 0,
      Live: 0
    }
  }
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
    },
    loadRoadmapBoxData: (state, action) => {
      state.roadmapBox = action.payload;
    }
  }
})

export const {loadFeedbacks, setLoading, loadRoadmapBoxData} = feedbackSlice.actions;

export default feedbackSlice.reducer;
