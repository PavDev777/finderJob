import { ChangeEvent, FC } from "react";

export enum inputType {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
}

type typeInputName =
  | "name"
  | "email"
  | "password"
  | "lastName"
  | "location"
  | "position"
  | "company"
  | "jobLocation"
  | "search";

interface IFormRowProps {
  type: inputType;
  name: typeInputName;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormRow: FC<IFormRowProps> = ({
  type,
  name,
  value,
  handleChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};
