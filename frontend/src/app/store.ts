import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.ts';
import ticketReducer from '../features/tickets/ticketSlice.js';
import noteReducer from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
});
