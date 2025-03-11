// store/actions/achievementActions.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchAchievementsByCategory} from '../../api/achievementApi';

const CATEGORIES = [
  'all',
  'glorious_moments',
  'matches',
  'honor',
  'progress',
  'items',
  'social',
  'general',
];

export const fetchAllAchievements = createAsyncThunk(
  'achievements/fetchAll',
  async ({query, limit}) => {
    const allData = {};

    for (const category of CATEGORIES) {
      const data = await fetchAchievementsByCategory(query, limit, category);
      allData[category] = data;
    }

    return allData;
  },
);
