"use client";
import { login } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await login(formData);
      console.log("Login form response data", response);
      if (!!response.error) {
        setError(response.error.message);
      } else {
        router.push("/bookings");
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      {error && <div className="text-xl text-red-500 text-center">{error}</div>}
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlhtmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlhtmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button type="submit" className="btn-primary w-full mt-4">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
