import { configureStore } from '@reduxjs/toolkit';
import heroReducer from './heroSlice';
import mediaReducer from './mediaSlice';

export const store = configureStore({
  reducer: {
    media: mediaReducer,
    hero: heroReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
