import {createSlice} from '@reduxjs/toolkit';


const slice = createSlice({
  name: 'main',
  initialState: {loading:false,modal:{show:false,content:null}},
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    setModal: (state,action) => {
      state.modal = action.payload;
    }
  }
})

export const {loading,setModal} = slice.actions;
export default slice.reducer;


export const getLoading = (state) => state.main.loading;
export const getModal = (state) => state.main.modal;