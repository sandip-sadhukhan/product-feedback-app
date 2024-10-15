import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './reducers/feedback-slice';

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer
  },
})