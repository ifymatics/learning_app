import { FC, ReactNode } from "react";
import "./Card.scss";
interface CardProp {
  className?: string;
  children: ReactNode;
  style?: object;
  onclick?: () => void;
}
const Card: FC<CardProp> = ({ className, children, ...others }) => {
  const classNames = [className ? className : "", "Card"];
  return (
    <div className={classNames.join(" ")} {...others}>
      {children}
    </div>
  );
};

export default Card;
