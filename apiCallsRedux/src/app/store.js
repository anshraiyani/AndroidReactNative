import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/Products/productsSlice'

export default store = configureStore({
    reducer:{
        products:productsReducer
    }
})