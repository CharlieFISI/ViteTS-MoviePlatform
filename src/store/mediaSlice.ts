import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MediaState = {
  activeTab: 'all' | 'movies' | 'series';
};

const initialState: MediaState = {
  activeTab: 'all'
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<'all' | 'movies' | 'series'>) {
      state.activeTab = action.payload;
    },
    initializeTab(state, action: PayloadAction<'all' | 'movies' | 'series'>) {
      state.activeTab = action.payload;
    }
  }
});

export const { setActiveTab, initializeTab } = mediaSlice.actions;
export default mediaSlice.reducer;
