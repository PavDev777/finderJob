import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { fetchCustom } from "../../../utils/axios";
import { getUserFromLocalStorage } from "../../../utils/localStorage";
import { getAllJobs } from "../allJobs/allJobsSlice";
import { IuserSliceState, logOutUser } from "../user/userSlice";
import {
  createJobReturnType,
  handleJobType,
  IEditedJob,
  IInitialStateJob,
} from "./type";

const initialState: IInitialStateJob = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk<
  createJobReturnType,
  Pick<
    IInitialStateJob,
    "position" | "company" | "jobLocation" | "jobType" | "status"
  >,
  { state: { user: IuserSliceState }; rejectValue: string }
>("job/createJob", async (job, { getState, dispatch, rejectWithValue }) => {
  try {
    const response = await fetchCustom.post("/jobs", job, {
      headers: {
        authorization: `Bearer ${getState().user.user?.token}`,
      },
    });
    dispatch(clearValues());
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        dispatch(logOutUser());
        return rejectWithValue("Unauthorized, Logging Out...");
      }
      return rejectWithValue(error.response?.data.msg);
    }
  }
});

export const deleteJob = createAsyncThunk<
  string,
  string,
  { state: { user: IuserSliceState }; rejectValue: string }
>("job/deleteJob", async (idJob, thunkAPI) => {
  try {
    const response = await fetchCustom.delete(`/jobs/${idJob}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user?.token}`,
      },
    });
    thunkAPI.dispatch(getAllJobs());
    return response.data.msg;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data.msg);
    }
  }
});

export const editedJob = createAsyncThunk<
  any,
  IEditedJob,
  { state: { user: IuserSliceState }; rejectValue: string }
>("job/editJob", async ({ jobId, job }, thunkAPI) => {
  try {
    const response = await fetchCustom.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user?.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data.msg);
    }
  }
});

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange(state, action: PayloadAction<handleJobType>) {
      state[action.payload.name] = action.payload.value;
    },
    clearValues() {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    editJob(
      state,
      action: PayloadAction<
        Pick<
          IInitialStateJob,
          | "editJobId"
          | "position"
          | "company"
          | "jobLocation"
          | "jobType"
          | "status"
        >
      >
    ) {
      return {
        ...state,
        isEditing: true,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Job created", {
        autoClose: 1500,
      });
    });
    builder.addCase(createJob.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload, {
        autoClose: 1500,
      });
    });
    builder.addCase(deleteJob.rejected, (state, action) => {
      toast.error(action.payload, {
        autoClose: 1500,
      });
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      toast.success(action.payload, {
        autoClose: 1500,
      });
    });
    builder.addCase(editedJob.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editedJob.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Job has been edited", {
        autoClose: 1500,
      });
    });
    builder.addCase(editedJob.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.payload, {
        autoClose: 1500,
      });
    });
  },
});

export const { handleChange, clearValues, editJob } = jobSlice.actions;

export default jobSlice.reducer;
