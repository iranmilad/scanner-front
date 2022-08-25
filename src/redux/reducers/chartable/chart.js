import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "chartable_chart",
  initialState: {modal: false,chart:null,point:null},
  reducers: {
    setModal: (state,action)=>{
      state.modal = ! state.modal
    },
    setPoint: (state ,action) => {
      state.point = action.payload;
    },
    setChart: (state,action)=>{
      state.chart = action.payload;
    }
  }
})

export const {setModal,setPoint,setChart} = slice.actions;
export default slice.reducer