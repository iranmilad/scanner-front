import {createSlice} from '@reduxjs/toolkit';


const slice = createSlice({
  name: 'main',
  initialState: {loading:false,modal:{show:false,content:null},routing:{},mainHeaders: 0,marketId: '',symbols:[]},
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    setModal: (state,action) => {
      state.modal = action.payload;
    },
    /**
     * this method sets some number to mainHeaders
     * there are some page and they have different headers
     * Default header is 0
     * market header or sahm header is 1
     */
    setMainHeader: (state,action) => {
      state.mainHeaders = action.payload;
    },
    setMarketId: (state,action) => {
      state.marketId = action.payload;
    },
    setSymbols: (state,action) => {
      state.symbols.push(action.payload);
    }
  }
})

export const {loading,setModal,setMainHeader,setMarketId,setSymbols} = slice.actions;
export default slice.reducer;


export const getLoading = (state) => state.main.loading;
export const getModal = (state) => state.main.modal;