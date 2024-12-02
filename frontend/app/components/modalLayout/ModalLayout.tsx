import React, { ReactNode } from "react";

import { FC } from "react";
import "./ModalLayout.scss";

type ModalLayoutProp = {
  onCancelModal?: () => void;
  children: ReactNode;
  title: string;
};
const ModalLayout: FC<ModalLayoutProp> = ({
  children,
  onCancelModal,
  title,
}) => {
  return (
    <div className="blur">
      <div className="cardWrapper">
        <div
          className="card"
          style={{ height: "min-content", margin: "3rem auto" }}
        >
          <div className="cancel" onClick={onCancelModal}>
            X
          </div>
          <h3 className="header">{title}</h3>
          <div className="modalbody">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
