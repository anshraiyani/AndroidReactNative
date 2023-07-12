import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    favoriteMovies: [],
  },
  reducers: {
    addFavoriteMovies: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
  },
});

export const {addFavoriteMovies} = userSlice.actions;

export default userSlice.reducer;
