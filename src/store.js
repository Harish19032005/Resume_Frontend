import { configureStore } from '@reduxjs/toolkit';
import resumesReducer from './features/resumes/resumesSlice';

export const store = configureStore({
  reducer: {
    resumes: resumesReducer
  }
});
