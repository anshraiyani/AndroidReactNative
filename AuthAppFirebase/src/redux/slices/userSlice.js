import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    favoriteMovies: [],
    watchlistMovies: [],
  },
  reducers: {
    addFavoriteMovies: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      const temp = [...state.favoriteMovies];
      state.favoriteMovies = temp.filter(el => el != action.payload);
    },
    updateFavoriteMovies: (state, action) => {
      state.favoriteMovies = [...action.payload];
    },
    addToWatchlist: (state, action) => {
      state.watchlistMovies.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      const temp = [...state.watchlistMovies];
      state.watchlistMovies = temp.filter(el => el != action.payload);
    },
    updateWatchlist: (state, action) => {
      state.watchlistMovies = [...action.payload];
    },
    clearArrays: state => {
      state.favoriteMovies = [];
      state.watchlistMovies = [];
    },
  },
});

export const {
  addFavoriteMovies,
  removeFavoriteMovie,
  updateFavoriteMovies,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlist,
  clearArrays,
} = userSlice.actions;
export const selectState = state => state.user;
export default userSlice.reducer;
