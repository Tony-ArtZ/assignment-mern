import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schema/login";
import { useFormik } from "formik";
import Input from "../components/Input";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../App";
import Password from "../components/Password";

const SignIn = () => {
  const [submitting, setSubmitting] = useState(false);
  let navigate = useNavigate();
  const [user] = React.useContext(UserContext);

  if (user) {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if (submitting) return;
      try {
        setSubmitting(true);
        if (!values.password || !values.email) {
          toast.error("Please fill all fields");
          setSubmitting(false);
          return;
        }
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await res.json();
        if (data.error) {
          if (data.error.message === "Email not verified!") {
            toast.error("Email not verified");
            navigate(`/resend-email?email=${values.email}`);
            setSubmitting(false);
            return;
          }
          console.log(data.error.message);
          toast.error(data.error.message);
          setSubmitting(false);
          return;
        }
        toast.success("Sign in successful");
        localStorage.setItem("auth-token", data.token);
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("An error occurred");
      }
      setSubmitting(false);
    },
  });

  return (
    <main className="grid place-items-center h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="w-72 md:w-80 md:bg-light p-5 md:bg-opacity-25 rounded-xl flex justify-center items-center flex-col gap-4"
      >
        <h1 className="w-full text-left text-5xl mb-4 text-light font-bold">
          Hi, Welcome
        </h1>
        {/* Email Field */}
        <Input
          name="email"
          type="email"
          disabled={submitting}
          label="Email"
          Icon={MdOutlineEmail}
          error={formik.errors.email}
          onChange={formik.handleChange}
        />
        {/* Password Field */}
        <Password
          name="password"
          type="password"
          disabled={submitting}
          label="Password"
          Icon={MdOutlineLock}
          error={formik.errors.password}
          onChange={formik.handleChange}
        />
        <Link to="/forgot-password" className="text-light">
          Forgot Password?
        </Link>
        {/* Login Button */}
        <button
          type="submit"
          className="font-main rounded-xl w-52 h-20 bg-light font-bold font-Inter text-dark hover:bg-transparent hover:text-light hover:border-2 hover:border-light transition-all ease-in-out duration-300"
        >
          Login
        </button>
        <h1 className="text-light">
          New User?{" "}
          <Link to="/signup" className="font-bold text-white">
            Register
          </Link>
        </h1>
      </form>
      <div className=" bg-stars fixed h-full w-full bg-repeat -z-20 bg-[20px]" />
      <div className=" bg-twinkling animate-twinkle fixed h-full w-[3000px] bg-repeat -z-10" />
      <img
        src="bg.svg"
        alt="background"
        width={1500}
        height={1500}
        className="fixed bottom-0 object-cover w-screen h-40 -z-10 xl:h-fit"
      />
    </main>
  );
};

export default SignIn;
