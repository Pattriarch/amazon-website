import { configureStore } from '@reduxjs/toolkit'
import { basketSlice } from "../slices/backetSlice";

export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer,
    },
});
