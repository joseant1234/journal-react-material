import { configureStore } from '@reduxjs/toolkit';

// internamente el configureStore llama al combineReducers
export const store = configureStore({
  reducer: {

  },
});
