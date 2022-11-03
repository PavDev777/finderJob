import { configureStore } from "@reduxjs/toolkit";
import allJobsReducer from "../redux/slices/allJobs/allJobsSlice";
import jobReducer from "../redux/slices/job/jobSlice";
import userReducer from "../redux/slices/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    allJobs: allJobsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
