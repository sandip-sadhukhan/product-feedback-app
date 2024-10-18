import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  feedbacks: [],
  filters: {
    category: 'all',
    sortBy: 'most-upvotes'
  },
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
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    }
  }
})

export const {
  loadFeedbacks,
  setLoading,
  loadRoadmapBoxData,
  setSortBy,
   setCategoryFilter
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
