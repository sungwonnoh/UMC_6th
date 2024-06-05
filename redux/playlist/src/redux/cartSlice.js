import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "songs",
  initialState: {
    list: [],
  },
  reducers: {
    setSongs: (state, action) => {
      state.list = action.payload;
    },
    increaseQuantity: (state, action) => {
      const song = state.list.find((song) => song.id === action.payload);
      if (song) song.amount += 1;
    },
    decreaseQuantity: (state, action) => {
      const song = state.list.find((song) => song.id === action.payload);
      if (song && song.amount) song.amount -= 1;
    },
  },
});
export const { setSongs, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
