import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { fetchCustom } from "../../../utils/axios";
import { createJobReturnType } from "../job/type";
import { IuserSliceState } from "../user/userSlice";
import { IInitialFiltersState, IInitialStateAllJobs } from "./type";

const initialFiltersState: IInitialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState: IInitialStateAllJobs = {
  isLoading: false,
  jobs: null,
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk<
  createJobReturnType[],
  void,
  { state: { user: IuserSliceState }; rejectValue: string }
>("allJobs/getAllJobs", async (_, { getState, rejectWithValue }) => {
  let url = "/jobs";
  try {
    const response = await fetchCustom.get(url, {
      headers: {
        authorization: `Bearer ${getState().user.user?.token}`,
      },
    });
    return response.data.jobs;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue("There was error");
    }
  }
});

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
    });
    builder.addCase(getAllJobs.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload, {
        autoClose: 1500,
      });
    });
  },
});

export default allJobsSlice.reducer;
