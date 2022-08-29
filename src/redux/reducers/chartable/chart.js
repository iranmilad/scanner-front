import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chartable_chart",
  initialState: {modal: false,chart:{label:"", id:"" ,pointIndex:""}},
  reducers: {
    setModal: (state,action)=>{
      state.modal = ! state.modal
    },
    setChart: (state,action)=>{
      state.chart = action.payload;
    }
  }
})

export const {setModal,setChart} = slice.actions;
export default slice.reducer