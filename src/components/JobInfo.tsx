import { FC, ReactNode } from "react";
import Wrapper from "../assets/wrappers/JobInfo";

interface IJobInfo {
  icon: ReactNode;
  text: string;
}

export const JobInfo: FC<IJobInfo> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};
