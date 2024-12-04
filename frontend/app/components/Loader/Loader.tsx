import { FC } from "react";
import "./Loader.scss";

interface LoaderProps {
  style?: object;
}

const Loader: FC<LoaderProps> = ({ style }) => {
  return <div className="loader" style={style}></div>;
};

export default Loader;
