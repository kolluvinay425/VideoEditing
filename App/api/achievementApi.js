// api/achievementApi.js

const BASE_URL = 'https://pubg-guides.onrender.com/api/achievements/all';

export const fetchAchievementsByCategory = async (query, limit, category) => {
  try {
    console.log('started------------------->', query);

    const url = `${BASE_URL}?name=${query}&limit=${limit}${
      category !== 'all' ? `&category=${category}` : ''
    }`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.achievements;
  } catch (error) {
    console.error(`Error fetching ${category} achievements:`, error);
    return [];
  }
};
