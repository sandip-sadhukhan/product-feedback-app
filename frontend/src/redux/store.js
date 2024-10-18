import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from './reducers/feedback-slice';
import modalReducer from './reducers/modal-slice';
import authSlice from './reducers/auth-slice';

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    modal: modalReducer,
    auth: authSlice
  },
})