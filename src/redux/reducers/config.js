import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "config",
  initialState: {needs:{}},
  reducers: {
    setConfig : (state,action) => {
      state.needs = action.payload;
    }
  }
});

export const {setConfig} = slice.actions;
export default slice.reducer;

export const selectConfig = state => state.config;