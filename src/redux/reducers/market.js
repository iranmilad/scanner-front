import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'market',
  initialState: [],
  reducers: {
    setMarket: (state, action) => {
      // find the object from state with the same id
      let market = state.find((item) => item.id === action.payload.id);
      if (market) {
        let index = state.findIndex((item) => item.id === action.payload.id);
        if (index === -1) return state;
        state[index] = Object.assign(market, action.payload);
      } else {
        let initialMarket = {
          ...action.payload,
          id: action.payload.id,
          averageSettings: {
            shortterm: "10",
            midterm: "20",
            longterm: "50",
            shortmovingterm: "10",
            midmovingterm: "20",
            longmovingterm: "50",
          },
        };
        state.push(initialMarket);
      }
    },
    getMarket: (state, action) => {
      return state;
    },
  },
});

export const { setMarket, getMarket } = slice.actions;

export default slice.reducer;
