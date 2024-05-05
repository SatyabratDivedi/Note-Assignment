import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: JSON.parse(localStorage.getItem('data')) || [],
    },
    reducers: {
        addData: (state, action) => {
            state.data = action.payload;
            console.log(action.payload)
        },
    },
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;