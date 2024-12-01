import { FC, useContext } from "react";
import { FiAlignJustify, FiSquare } from "react-icons/fi";
import { FaCheckSquare } from "react-icons/fa";

import "./subject.scss";
import { AuthContext } from "./../../../auth.context";

interface SubjectProp {
  name: string;
  id: number;
  index: number;
  isCompleted: number;
  userId: number;
  onClick: (id: number) => void;
  fromAdmin: boolean;
}
const Subject: FC<SubjectProp> = ({
  name,
  id,
  index,
  userId,
  fromAdmin,
  onClick,
  isCompleted = 0,
}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="subject" onClick={() => onClick(id)}>
      <div className="icons">
        <FiAlignJustify />
        {!fromAdmin && (
          <>
            {isCompleted &&
            currentUser !== null &&
            userId === currentUser?.id ? (
              <FaCheckSquare />
            ) : (
              <FiSquare />
            )}
          </>
        )}
      </div>
      <div className="textContainer">
        <div className="number">{index + 1 + "."}</div>
        <div className="textTitleContainer">
          <div className="textTitle">{name}</div>
          <div className="line"></div>
        </div>
      </div>
      {fromAdmin && (
        <div
          className="viewRank"
          onClick={() => {
            console.log("clicked on card");
          }}
        >
          view ranks
        </div>
      )}
    </div>
  );
};

export default Subject;
