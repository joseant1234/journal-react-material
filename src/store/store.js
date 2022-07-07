import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { journalSlice } from './journal/journalSlice';

// internamente el configureStore llama al combineReducers
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
});
