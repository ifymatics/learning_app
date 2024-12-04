"use client";
import { useState, useContext, ChangeEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";

import { AuthContext, LoginData } from "./../../auth.context";

import AuthForm from "../components/authForm/AuthForm";
import Link from "next/link";
type LoggedInUserData = {
  email: string;
  id: string;
  role: string;
};
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useRouter();
  const [value, setValue] = useState<LoginData>({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  // const autCtx = useContext();
  const [err, setErr] = useState(null);

  const onClickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (value.email.length > 0 && value.password.length > 0) {
      setIsSubmitting(true);

      try {
        const data = (await login(value)) as LoggedInUserData;
        if (data.id && data.role) {
          if (data.id && data.role === "0") navigate.push("/");
          if (data.id && data.role === "1") navigate.push("admin");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setErr(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <AuthForm
      err={err}
      isSubmitting={isSubmitting}
      onChangeHandler={onChangeHandler}
      onClickHandler={onClickHandler}
      title="Login"
      value={value}
      key={"Login"}
      button="Login to your account"
      footerLink={
        <Link className="forgot_password" href="/signup">
          Go to signup?
        </Link>
      }
    />
  );
};

export default Login;
