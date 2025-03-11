// store/reducers/achievementReducer.js
import {createSlice} from '@reduxjs/toolkit';
import {fetchAllAchievements} from '../actions/achievementActions';

const initialState = {
  achievements: {},
  loading: false,
  error: null,
  query: {}, // query is now an object with tab names as keys
  limit: 10,
  hasMore: true,
};

const achievementSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    setQuery(state, action) {
      const {category, query} = action.payload;
      state.query[category] = query; // store query per category
      state.limit = 10; // reset limit when changing query
    },
    incrementLimit(state) {
      state.limit += 10;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllAchievements.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAchievements.fulfilled, (state, action) => {
        state.achievements = action.payload;
        const allCount = action.payload?.all?.length || 0;
        state.hasMore = allCount >= state.limit;
        state.loading = false;
      })
      .addCase(fetchAllAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const {setQuery, incrementLimit} = achievementSlice.actions;
export default achievementSlice.reducer;
