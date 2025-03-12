export const FETCH_ACHIEVEMENTS = 'FETCH_ACHIEVEMENTS';
export const SET_LIMIT = 'SET_LIMIT';

export const fetchAchievements =
  (category, limit = 10) =>
  async dispatch => {
    try {
      const response = await fetch(
        ` https://pubg-guides.onrender.com/api/achievements/all?category=${category}&page=1&limit=${limit}`,
      );
      const data = await response.json();

      dispatch({
        type: FETCH_ACHIEVEMENTS,
        payload: {category, data},
      });

      dispatch({
        type: SET_LIMIT,
        payload: {category, limit},
      });
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };
