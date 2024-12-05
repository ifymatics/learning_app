import { FC } from "react";
import "./Ranks.scss";
import ModalLayout from "../modalLayout/ModalLayout";
import Rank from "../rank/Rank";

type RankProp = {
  onCancelModal: () => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ranks: any[];
};

const Ranks: FC<RankProp> = ({ ranks, onCancelModal }) => {
  return (
    <div onClick={onCancelModal}>
      <ModalLayout title="Rank of Learners" onCancelModal={onCancelModal}>
        <div>
          <div
            className="rankHead"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "3rem",
              fontSize: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div className="numberHead">
              {" "}
              <b>No</b>
            </div>
            <div className="emailHead">
              <b>Email</b>
            </div>
            <div className="duration">
              <b>Rate(mins)</b>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {ranks.length > 0 ? (
              ranks?.map((rank, index) => (
                <Rank
                  email={rank.email}
                  rate={rank.rate}
                  key={rank.id}
                  index={index + 1}
                  id={rank.id}
                />
              ))
            ) : (
              <h3 style={{ textAlign: "center", margin: "0 auto;" }}></h3>
            )}
          </div>
        </div>
      </ModalLayout>
    </div>
  );
};

export default Ranks;
