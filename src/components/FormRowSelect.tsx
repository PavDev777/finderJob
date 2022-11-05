import { ChangeEvent, FC } from "react";

interface IFormRowSelectProps {
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  listOptions: string[];
}

export const FormRowSelect: FC<IFormRowSelectProps> = ({
  name,
  value,
  handleChange,
  listOptions,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <select
        name={name}
        id={name}
        onChange={handleChange}
        className="form-select"
        value={value}
      >
        {listOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
