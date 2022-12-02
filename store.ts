import { configureStore } from "@reduxjs/toolkit";
import menuReducers from "./slices/menu";
import { combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
const reducers = combineReducers({
    menuReducers,
});
const store = () => configureStore({
    reducer: reducers,
});
export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store;
export const wrapper = createWrapper<AppStore>(store);