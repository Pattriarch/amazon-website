import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state: any, action: any) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state: any, action) => {
             state.items = state.items.filter((item: { id: any; }) => (
                item.id !== action.payload.id
            ))
        },
    },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket.items;
export const selectTotal = (state: any) => state.basket.items.reduce((accumulator: any, item: any) => accumulator + item.price, 0);

export default basketSlice.reducer;
