import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // Adjust the path if necessary

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
