import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  achievements: {
    all: [],
    glorious_moments: [],
    matches: [],
    honor: [],
    progress: [],
    items: [],
    social: [],
    general: [],
  },
  loading: false,
  limits: {
    all: 10,
    glorious_moments: 10,
    matches: 10,
    honor: 10,
    progress: 10,
    items: 10,
    social: 10,
    general: 10,
  },
};

const achievementsSlice = createSlice({
  name: 'achievements', // Slice name
  initialState,
  reducers: {
    fetchAchievements: (state, action) => {
      const {category, data} = action.payload;
      state.data[category] = data; // Update the category with the fetched data
    },
    setLimit: (state, action) => {
      const {category, limit} = action.payload;
      state.limits[category] = limit; // Update the limit for a category
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set the loading state
    },
  },
});

export const {fetchAchievements, setLimit, setLoading} =
  achievementsSlice.actions;

export default achievementsSlice.reducer;
