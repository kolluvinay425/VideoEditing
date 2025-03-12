import {FETCH_ACHIEVEMENTS, SET_LIMIT} from '../actions/achievementActions';

const initialState = {
  data: {
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

const achievementsReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case FETCH_ACHIEVEMENTS:
      return {
        ...state,
        data: {
          ...state.data,
          [payload.category]: payload.data,
        },
      };
    case SET_LIMIT:
      return {
        ...state,
        limits: {
          ...state.limits,
          [payload.category]: payload.limit,
        },
      };
    default:
      return state;
  }
};

export default achievementsReducer;
