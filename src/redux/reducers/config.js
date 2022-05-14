import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "config",
  initialState: {needs:{},industries:{},industriesGroups:[],dailyList: []},
  reducers: {
    setConfig : (state,action) => {
      state.needs = action.payload;
    },
    setIndustries : (state,action) => {
      state.industries = action.payload;
    },
    setIndustriesGroups: (state,action) => {
      state.industriesGroups = action.payload;
    },
    setDailyList: (state,action) => {
      state.dailyList = action.payload;
    }
  }
});

export const {setConfig,setIndustries,setIndustriesGroups,setDailyList} = slice.actions;
export default slice.reducer;

export const selectConfig = state => state.config;