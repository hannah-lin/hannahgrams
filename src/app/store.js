import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import hannahgramsReducer from '../features/hannahgrams/hannahgramsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    hannahgrams: hannahgramsReducer
  },
});
