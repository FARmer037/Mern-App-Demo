import { configureStore } from '@reduxjs/toolkit'
import authReduce from '../features/auth/authSlice'
import goalReduce from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authReduce,
    goals: goalReduce
  },
});
