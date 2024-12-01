import { FC, ReactNode } from "react";
import "./Card.scss";
interface CardProp {
  className?: string;
  children: ReactNode;
  style?: object;
  onclick?: () => void;
}
const Card: FC<CardProp> = ({ className, children, style, ...others }) => {
  const classNames = [className, "Card"];
  return (
    <div className={classNames.join(" ")} style={style} {...others}>
      {children}
    </div>
  );
};

export default Card;
