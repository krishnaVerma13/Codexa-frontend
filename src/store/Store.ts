// store/index.ts
// This is the brain of your entire Redux setup.
// configureStore combines all your slices into one global state object.

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector,type TypedUseSelectorHook } from "react-redux";
import editorReducer from "../slices/editorSlice";

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    // add more slices here later: auth: authReducer, etc.
  },
  devTools: import.meta.env.MODE !== "production",
});

// These two types describe the shape of your entire store
// RootState = { editor: EditorState } — grows as you add more slices
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Always use these typed hooks instead of raw useDispatch / useSelector
// useAppSelector knows about EditorState, AuthState, etc. — full autocomplete
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;