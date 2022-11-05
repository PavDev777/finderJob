import React, { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useAppSelector } from "../redux/hooks";
import { allJobsSelector } from "../redux/slices/allJobs/selectors";
import { AreaChartComponent } from "./AreaChart";
import { BarChartComponent } from "./BarChart";

export const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications } = useAppSelector(allJobsSelector);
  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChartComponent monthlyApplications={monthlyApplications} />
      ) : (
        <AreaChartComponent monthlyApplications={monthlyApplications} />
      )}
    </Wrapper>
  );
};
