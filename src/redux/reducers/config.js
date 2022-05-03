import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "config",
  initialState: {needs:{},industries:{}},
  reducers: {
    setConfig : (state,action) => {
      state.needs = action.payload;
    },
    setIndustries : (state,action) => {
      state.industries = action.payload;
    }
  }
});

export const {setConfig,setIndustries} = slice.actions;
export default slice.reducer;

export const selectConfig = state => state.config;