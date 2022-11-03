import { User } from "../redux/slices/user/userSlice";

export const userLocalStorageAdd = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = (): User | null => {
  const key = localStorage.getItem("user");
  const user = key ? JSON.parse(key) : null;
  return user;
};
