import React, { ReactNode } from "react";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useAppSelector } from "../redux/hooks";
import { allJobsSelector } from "../redux/slices/allJobs/selectors";
import { StatItem } from "./StatItem";

export interface IStatsDefault {
  title: string;
  count: number;
  icon: ReactNode;
  color: string;
  bgc: string;
}

export const StatsContainer = () => {
  const { stats } = useAppSelector(allJobsSelector);

  const statsDefault: IStatsDefault[] = [
    {
      title: "pending applications",
      count: stats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bgc: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bgc: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats?.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bgc: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {statsDefault.map((stats, index) => (
        <StatItem key={index} {...stats} />
      ))}
    </Wrapper>
  );
};
