import { AxiosError } from "axios";
import { IInitialState } from "../../../pages/Register";
import { fetchCustom } from "../../../utils/axios";

export const registerUserThunk = async (
  url: string,
  user: Omit<IInitialState, "isMember">,
  thunkAPI: any
) => {
  try {
    const response = await fetchCustom.post(url, user);
    return response.data.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.response?.data.msg);
    }
  }
};
