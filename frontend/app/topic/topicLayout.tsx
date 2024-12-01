"use client";
import React, { FC } from "react";
import Card from "../componets/card/Card";
import "./topicLayout.scss";
import { FaCheckSquare } from "react-icons/fa";
type TopicProp = {
  video: string;
  title: string;
  id: number;
  desc: string;
  completed: boolean;
  handleCompleted: (id: number) => void;
};
const TopicLayout: FC<TopicProp> = ({
  title,
  video,
  desc,
  id,
  handleCompleted,
  completed,
}) => {
  return (
    <Card key={id} className="topic">
      <div className="topicContainer" style={{ cursor: "pointer" }}>
        <div className="title">
          <h3>{title}</h3>
        </div>
        <div className="video"> video:{video}</div>
        <Card className="desc">
          {" "}
          <h4>description </h4>
          <div className="descBody">{desc}</div>
        </Card>
      </div>
      <Card>
        {completed ? (
          <FaCheckSquare />
        ) : (
          <button
            className="completedButton"
            onClick={() => handleCompleted(id)}
            style={{
              backgroundColor: "white",
              color: "black",
              marginTop: "5px",
            }}
          >
            {"mark as finished"}
          </button>
        )}
      </Card>
    </Card>
  );
};

export default TopicLayout;
