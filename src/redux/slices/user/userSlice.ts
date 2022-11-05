import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IProfileUser } from "../../../pages/dashboard/Profile";
import { IInitialState } from "../../../pages/Register";
import { fetchCustom } from "../../../utils/axios";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  userLocalStorageAdd,
} from "../../../utils/localStorage";

export interface User {
  email: string;
  lastName: string;
  location: string;
  name: string;
  token: string;
}

export interface IuserSliceState {
  user: User | null;
  isLoading: boolean;
  isOpenSidebar: boolean;
}

const initialState: IuserSliceState = {
  user: getUserFromLocalStorage(),
  isLoading: false,
  isOpenSidebar: false,
};

export const registerUser = createAsyncThunk<
  User,
  Omit<IInitialState, "isMember">,
  {
    rejectValue: string;
  }
>("user/registerUser", async (user, thunkAPI) => {
  try {
    const response = await fetchCustom.post("/auth/register", user);
    return response.data.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data.msg);
    }
  }
});

export const loginUser = createAsyncThunk<
  User,
  Pick<IInitialState, "email" | "password">,
  {
    rejectValue: string;
  }
>("user/loginUser", async (user, thunkAPI) => {
  try {
    const response = await fetchCustom.post("/auth/login", user);
    return response.data.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data.msg);
    }
  }
});

export const updateUser = createAsyncThunk<
  User,
  IProfileUser,
  { state: { user: IuserSliceState }; rejectValue: string }
>("user/updateUser", async (user, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetchCustom.patch("/auth/updateUser", user);
    return response.data.user;
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    sidebarToggle(state) {
      state.isOpenSidebar = !state.isOpenSidebar;
    },

    logOutUser(state) {
      state.user = null;
      state.isOpenSidebar = false;
      removeUserFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.user = action.payload;
        userLocalStorageAdd(action.payload);
        toast.success(`Hi ${state.user.name} !`);
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        toast.error(action.payload, {
          autoClose: 1500,
        });
      }
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.user = action.payload;
        userLocalStorageAdd(action.payload);
        toast.success(`Welcome back ${state.user.name} !`, {
          autoClose: 1500,
        });
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        toast.error(action.payload, {
          autoClose: 1500,
        });
      }
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.user = action.payload;
        userLocalStorageAdd(action.payload);
        toast.success(`User has been updated!`, {
          autoClose: 1500,
        });
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        toast.error(action.payload, {
          autoClose: 1500,
        });
      }
    });
  },
});

export const { sidebarToggle, logOutUser } = userSlice.actions;

export default userSlice.reducer;
