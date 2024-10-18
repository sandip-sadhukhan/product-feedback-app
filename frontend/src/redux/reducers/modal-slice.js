import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isSignInModalOpened: false
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignInModal: (state) => {
      state.isSignInModalOpened = true;
    },
    closeSignInModal: (state) => {
      state.isSignInModalOpened = false;
    }
  }
})

export const {closeSignInModal, openSignInModal} = modalSlice.actions;

export default modalSlice.reducer;