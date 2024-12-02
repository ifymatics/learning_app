import React, { FC } from "react";
import "./Rank.scss";
type RankProp = {
  id: number;
  email: string;
  rate: number;
  index: number;
};

const Rank: FC<RankProp> = ({ email, rate, index }) => {
  return (
    <div className="rankContainer">
      <div className="Number">{index}</div>
      <div className="email">{email}</div>
      <div className="duration">{rate}</div>
    </div>
  );
};

export default Rank;
