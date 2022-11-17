import { createSlice } from "@reduxjs/toolkit";
import lodash from "lodash";

const slice = createSlice({
  name: 'technowatch',
  initialState: {filterParams: []},
  reducers: {
    setTechnoWatchFilter: (state,action)=>{
      let unique = lodash.uniqBy(action.payload, function(e){
        return e.name
      });
      state.filterParams = unique;
    }
  }
})

export const {setTechnoWatchFilter } = slice.actions;

export default slice.reducer