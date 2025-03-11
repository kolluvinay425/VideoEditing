// store/index.js
import {configureStore} from '@reduxjs/toolkit';
import achievementReducer from './reducers/achievementReducer';

const store = configureStore({
  reducer: {
    achievements: achievementReducer,
  },
});

export {store};
