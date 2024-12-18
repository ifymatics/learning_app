import React, { ChangeEvent, FC, MouseEvent, ReactNode } from "react";
import "./authForm.scss";
import Loader from "../Loader/Loader";
interface AuthFormProp {
  title: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  value: { email: string; password: string };
  err: null;
  onClickHandler: (e: MouseEvent<HTMLButtonElement>) => void;
  isSubmitting: boolean;
  footerLink: ReactNode;
  button: string;
}

const AuthForm: FC<AuthFormProp> = ({
  title,
  onChangeHandler,
  onClickHandler,
  isSubmitting,
  footerLink,
  button,
  value,
  err,
}) => {
  return (
    <div className="AuthForm">
      <div className="appLogo">EasyLearn</div>
      <div className="card">
        <h1>{title}</h1>
        <form>
          <input
            name="email"
            onChange={onChangeHandler}
            type="text"
            placeholder="Email address"
            value={value.email}
          />
          <input
            name="password"
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            value={value.password}
          />
          {err && <div className="error">Error: {err}</div>}
          {!isSubmitting && (
            <button
              type="button"
              onClick={(e: MouseEvent<HTMLButtonElement>) => onClickHandler(e)}
            >
              {button}
            </button>
          )}

          {isSubmitting && (
            <button style={{ display: "flex", justifyContent: "center" }}>
              {<Loader />}
            </button>
          )}
        </form>
        {footerLink}
      </div>
    </div>
  );
};

export default AuthForm;
