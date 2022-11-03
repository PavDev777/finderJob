import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { inputType } from "../../components/FormRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/slices/user/selectors";
import { updateUser, User } from "../../redux/slices/user/userSlice";

export interface IProfileUser extends Omit<User, "token"> {}

export const Profile = () => {
  const { user, isLoading } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<IProfileUser>({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { lastName, name, location, email } = userData;
    if (!name || !location || !email || !lastName) {
      toast.error("Please fill all fields", {
        autoClose: 1500,
      });
      return;
    }
    dispatch(updateUser(userData));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type={inputType.TEXT}
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type={inputType.TEXT}
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type={inputType.EMAIL}
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type={inputType.TEXT}
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "please wait.." : "submit"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
