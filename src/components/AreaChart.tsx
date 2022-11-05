import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ICharts } from "./BarChart";

export const AreaChartComponent = ({ monthlyApplications }: ICharts) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={monthlyApplications} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area
            dataKey="count"
            type="monotone"
            stroke="#1e3a8a"
            fill="#3b82f6"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
