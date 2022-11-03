import { useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllJobs } from "../redux/slices/allJobs/allJobsSlice";
import { allJobsSelector } from "../redux/slices/allJobs/selectors";
import { Job } from "./Job";

export const JobsContainer = () => {
  const { jobs, isLoading } = useAppSelector(allJobsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  if (isLoading) {
    return (
      <MagnifyingGlass
        height="150"
        width="100%"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{ display: "grid", placeContent: "center" }}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    );
  }

  if (!jobs?.length) {
    return (
      <Wrapper>
        <h2>Jobs is empty...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs?.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
    </Wrapper>
  );
};
