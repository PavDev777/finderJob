import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IStats } from "../redux/slices/allJobs/type";

export interface ICharts {
  monthlyApplications: IStats["monthlyApplications"];
}

export const BarChartComponent = ({ monthlyApplications }: ICharts) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyApplications} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="10 10 " />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#3b82f6" barSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
};
