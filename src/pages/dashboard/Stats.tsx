import { useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { ChartsContainer, StatsContainer } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { showStats } from "../../redux/slices/allJobs/allJobsSlice";
import { allJobsSelector } from "../../redux/slices/allJobs/selectors";

export const Stats = () => {
  const { isLoading, monthlyApplications } = useAppSelector(allJobsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(showStats());
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

  return (
    <>
      <StatsContainer />
      {monthlyApplications && monthlyApplications?.length > 0 && (
        <ChartsContainer />
      )}
    </>
  );
};
