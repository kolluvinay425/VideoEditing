// context/AchievementContext.js
import React, {createContext, useContext} from 'react';

export const AchievementContext = createContext();

export const useAchievement = () => useContext(AchievementContext);
