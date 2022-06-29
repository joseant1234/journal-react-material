import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';

// internamente el configureStore llama al combineReducers
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
