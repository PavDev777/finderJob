import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { fetchCustom } from "../../../utils/axios";
import { getUserFromLocalStorage } from "../../../utils/localStorage";
import { IuserSliceState, logOutUser } from "../user/userSlice";
import { createJobReturnType, handleJobType, IInitialStateJob } from "./type";

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
  },
});

export const { handleChange, clearValues } = jobSlice.actions;

export default jobSlice.reducer;
