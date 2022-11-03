import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo } from "../components";
import { inputType } from "../components/FormRow";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userSelector } from "../redux/slices/user/selectors";
import { loginUser, registerUser } from "../redux/slices/user/userSlice";
import { useNavigate } from "react-router-dom";

export interface IInitialState {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
}

const initialState: IInitialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
export const Register = () => {
  const [values, setValues] = useState<IInitialState>(initialState);
  const { user, isLoading } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields", {
        autoClose: 1500,
      });
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMembers = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && (
          <FormRow
            type={inputType.TEXT}
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type={inputType.EMAIL}
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type={inputType.PASSWORD}
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "Loading..." : "submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet ?" : "Already a member ?"}
          <button type="button" onClick={toggleMembers} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
