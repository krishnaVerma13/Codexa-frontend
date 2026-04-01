// store/slices/editorSlice.ts
// This slice owns everything about the Monaco editor:
// language, theme, font size, output, running state, errors.
// The Monaco editor INSTANCE itself is NOT stored here (explained below).

import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

// ─── Step 1: Define the shape of this slice's state ───────────────────────────
// Every field the editor cares about lives here.
// Notice: no `editor` field — Monaco instances are not serializable (they are
// complex class objects). Redux requires state to be plain JSON-serializable
// values. The editor instance will live in a useRef inside your component.

interface EditorState {
  language: string;
  theme: string;
  fontSize: number;
  output: string;
  isRunning: boolean;
  error: string | null;
  executionResult: unknown | null;
}

// ─── Step 2: Read initial values ──────────────────────────────────────────────
// This replicates your original getInitialState() exactly.
// - On the server (SSR / Next.js): window doesn't exist, so return safe defaults
// - On the client: read from localStorage so the user's preferences persist

const getInitialState = (): EditorState => {
  if (typeof window === "undefined") {
    // Server — no localStorage available
    return {
      language: "javascript",
      theme: "vs-dark",
      fontSize: 16,
      output: "",
      isRunning: false,
      error: null,
      executionResult: null,
    };
  }

  // Client — restore from localStorage
  return {
    language: localStorage.getItem("editor-language") || "javascript",
    theme: localStorage.getItem("editor-theme") || "vs-dark",
    fontSize: Number(localStorage.getItem("editor-font-size")) || 16,
    output: "",        // output is session-only, don't persist
    isRunning: false,
    error: null,
    executionResult: null,
  };
};

// ─── Step 3: Create the slice ─────────────────────────────────────────────────
// createSlice does three things at once:
//   1. Defines the initial state
//   2. Creates reducer functions (the `reducers` object)
//   3. Auto-generates action creators with the same names
//
// You write `state.language = action.payload` instead of returning a new object —
// RTK uses Immer under the hood so direct mutation is safe and intentional here.

const editorSlice = createSlice({
  name: "editor", // prefix for all action types: "editor/setLanguage", etc.
  initialState: getInitialState(),
  reducers: {

    // setLanguage — same logic as your Zustand setLanguage
    // Before switching language, the component will save the current code to
    // localStorage (needs editorRef, handled in the component).
    // This reducer only updates Redux state + persists the new language choice.
    setLanguage(state, action: PayloadAction<string>) {
      localStorage.setItem("editor-language", action.payload);
      state.language = action.payload;
      state.output = "";   // clear output when language changes
      state.error = null;  // clear error when language changes
    },

    setTheme(state, action: PayloadAction<string>) {
      localStorage.setItem("editor-theme", action.payload);
      state.theme = action.payload;
    },

    setFontSize(state, action: PayloadAction<number>) {
      localStorage.setItem("editor-font-size", action.payload.toString());
      state.fontSize = action.payload;
    },

   

    // These three are called from your run-code logic
    setOutput(state, action: PayloadAction<string>) {
      state.output = action.payload;
    },

    setRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    setExecutionResult(state, action: PayloadAction<unknown>) {
      state.executionResult = action.payload;
    },
  },
});

// ─── Step 4: Export actions ───────────────────────────────────────────────────
// These are the functions you'll call inside dispatch() from your components.
// e.g. dispatch(setLanguage("python"))

export const {
  setLanguage,
  setTheme,
  setFontSize,
  setOutput,
  setRunning,
  setError,
  setExecutionResult,
} = editorSlice.actions;

// ─── Step 5: Export selectors ─────────────────────────────────────────────────
// Selectors are just functions that receive the full RootState and return
// one specific piece. Keeping them here (colocated with the slice) means
// if you ever rename a field, you fix it in one place, not in every component.

export const selectLanguage        = (state: { editor: EditorState }) => state.editor.language;
export const selectTheme           = (state: { editor: EditorState }) => state.editor.theme;
export const selectFontSize        = (state: { editor: EditorState }) => state.editor.fontSize;
export const selectOutput          = (state: { editor: EditorState }) => state.editor.output;
export const selectIsRunning       = (state: { editor: EditorState }) => state.editor.isRunning;
export const selectError           = (state: { editor: EditorState }) => state.editor.error;
export const selectExecutionResult = (state: { editor: EditorState }) => state.editor.executionResult;

// ─── Step 6: Export reducer (goes into store/index.ts) ────────────────────────
export default editorSlice.reducer;