import {createSlice} from '@reduxjs/toolkit';


const slice = createSlice({
  name: 'main',
  initialState: {loading:false},
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

export const {loading} = slice.actions;
export default slice.reducer;


export const getLoading = (state) => state.main.loading;