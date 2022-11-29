import {createSelector, createSlice} from "@reduxjs/toolkit"

const slice = createSlice({
  name: "filterModal",
  initialState: {},
  reducers: {
    registerModal: (state,action) =>{
      state[action.payload.id] = action.payload
    },
  }
})

export const {registerModal} = slice.actions
export default slice.reducer;

// find the modal by id with createSelector
export const findModal = createSelector(
  (state) => state.filterModal,
  (state, id) => id,
  (filterModal, id) => filterModal[id]
)