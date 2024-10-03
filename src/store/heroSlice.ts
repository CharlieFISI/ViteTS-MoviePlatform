import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeroState {
  currentIndex: number;
  isImageLoaded: boolean;
}

const initialState: HeroState = {
  currentIndex: 0,
  isImageLoaded: false
};

export const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setIsImageLoaded: (state, action: PayloadAction<boolean>) => {
      state.isImageLoaded = action.payload;
    },
    resetHeroState: (state) => {
      state.currentIndex = 0;
      state.isImageLoaded = false;
    }
  }
});

export const { setCurrentIndex, setIsImageLoaded, resetHeroState } =
  heroSlice.actions;

export default heroSlice.reducer;
