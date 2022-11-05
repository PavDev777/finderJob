import React, { FC } from "react";
import Wrapper from "../assets/wrappers/StatItem";

import { IStatsDefault } from "./StatsContainer";

export const StatItem: FC<IStatsDefault> = (props) => {
  return (
    <Wrapper bgc={props.bgc} color={props.color}>
      <header>
        <span className="count">{props.count}</span>
        <span className="icon">{props.icon}</span>
      </header>
      <h5 className="title">{props.title}</h5>
    </Wrapper>
  );
};
