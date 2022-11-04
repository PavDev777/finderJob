import { ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import { inputType } from "../../components/FormRow";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearValues,
  createJob,
  editedJob,
  handleChange,
} from "../../redux/slices/job/jobSlice";
import { jobSelector } from "../../redux/slices/job/selectors";
import { userSelector } from "../../redux/slices/user/selectors";

export const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useAppSelector(jobSelector);
  const { user } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields", {
        autoClose: 1500,
      });
      return;
    }

    if (isEditing) {
      dispatch(
        editedJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }

    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJob = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (user?.location && !isEditing) {
      dispatch(
        handleChange({
          name: "jobLocation",
          value: user?.location,
        })
      );
    }
  }, []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <FormRow
            type={inputType.TEXT}
            name="position"
            value={position}
            handleChange={handleJob}
          />
          <FormRow
            type={inputType.TEXT}
            name="company"
            value={company}
            handleChange={handleJob}
          />
          <FormRow
            type={inputType.TEXT}
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJob}
          />
          {/* status */}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJob}
            listOptions={statusOptions}
          />
          {/* jobType */}
          <FormRowSelect
            name="jobType"
            value={jobType}
            handleChange={handleJob}
            listOptions={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-clock clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-clock submit-btn"
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
