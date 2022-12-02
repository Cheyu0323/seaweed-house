import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store"

type InitialState = {
    isMenuClick: boolean;
};

const initialState: InitialState = {
    isMenuClick: false,
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenuStatus: (state, action) => {
            state.isMenuClick = action.payload;
        }
    },
});

export const { setMenuStatus } = menuSlice.actions;
export const selectMenuState = (state: AppState) => state.menuReducers.isMenuClick;
export default menuSlice.reducer;