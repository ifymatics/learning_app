"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import AuthForm from "../components/authForm/AuthForm";
import { LoginData } from "@/auth.context";
import { requestConfig } from "@/services/axios";
import Link from "next/link";

const Signup = () => {
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

  const onClickHandler = async () => {
    if (value.email.length <= 0 && value.password.length <= 0) {
      return;
    }
    setIsSubmitting(true);
    try {
      setIsSubmitting(true);
      await requestConfig.post("/api/users", value);
      navigate.push("/login");
      setIsSubmitting(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErr(error.message ? "Signup failed" : error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AuthForm
      err={err}
      isSubmitting={isSubmitting}
      onChangeHandler={onChangeHandler}
      onClickHandler={onClickHandler}
      title="Sign up"
      value={value}
      key={"Signup"}
      button={"signUp"}
      footerLink={
        <Link className="forgot_password" href="/login">
          Go to Login?
        </Link>
      }
    />
  );
};

export default Signup;
