import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { registerSchema } from "../schema/register";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { UserContext } from "../App";
import Password from "../components/Password";
import { IoMdClose } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

const Register = () => {
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  let navigate = useNavigate();
  const [user] = React.useContext(UserContext);

  const toggleTerms = () => {
    setTerms(!terms);
  };

  if (user) {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      if (submitting) return;
      try {
        setSubmitting(true);
        if (!values.password || !values.email) {
          toast.error("Please fill all fields");
          setSubmitting(false);
          return;
        }

        if (values.password !== values.confirmPassword) {
          toast.error("Passwords do not match");
          setSubmitting(false);
          return;
        }
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/auth/register`,
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
          console.log(data.error.message);
          toast.error(data.error.message);
          setSubmitting(false);
          return;
        }
        toast.success("Account created successfully");
        navigate("/signin");
      } catch (error) {
        console.log(error);
        toast.error("An error occurred");
      }
      setSubmitting(false);
    },
  });

  return (
    <main className="grid place-items-center h-screen">
      {/* terms and condition modal */}
      {terms && (
        <>
          <div className=" w-full sm:w-[500px] bg-mid-dark absolute z-50 sm:top-8 py-12 px-8 sm:px-12">
            <div className="w-full mb-4">
              <button onClick={toggleTerms}>
                <IoMdClose className="inline-block text-4xl" />
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-mid-light">
              Terms and Conditions
            </h1>
            <p className="text-light">
              By using this website, you agree to the following terms: Use for
              lawful purposes only. No harassment or illegal activities. Website
              content is the property of [Company Name] and protected by
              copyright. You may not copy, modify or distribute. User content
              posted becomes non-confidential and we can use it. We are not
              responsible for third-party website links. Website provided as is
              without warranties. [Company Name] not liable for any damages from
              website use. Governed by laws of [State/Country]. We may modify
              these terms at any time. Continued use means acceptance.
            </p>
          </div>
          <div
            className="w-screen h-screen z-30 absolute backdrop-blur-lg"
            onClick={toggleTerms}
          />
        </>
      )}

      <form
        onSubmit={formik.handleSubmit}
        className="w-72 md:w-80 md:bg-light p-5 md:bg-opacity-25 rounded-xl flex justify-center items-center flex-col gap-4"
      >
        <h1 className="w-full text-left text-5xl mb-4 text-light font-bold">
          New Here?
        </h1>
        {/* Name Field */}
        <Input
          name="name"
          type="text"
          label="Name"
          Icon={IoPersonOutline}
          error={formik.errors.name}
          onChange={formik.handleChange}
        />
        {/* Email Field */}
        <Input
          name="email"
          type="email"
          label="Email"
          Icon={MdOutlineEmail}
          error={formik.errors.email}
          onChange={formik.handleChange}
        />
        {/* Password Field */}
        <Password
          name="password"
          type="password"
          label="Password"
          Icon={MdOutlineLock}
          error={formik.errors.password}
          onChange={formik.handleChange}
        />
        {/* Confirm Password Field */}
        <Password
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          Icon={MdOutlineLock}
          error={formik.errors.confirmPassword}
          onChange={formik.handleChange}
        />
        {/* Terms and Conditions */}
        <label className="text-light flex items-center gap-2">
          <input
            type="checkbox"
            name="terms"
            onChange={formik.handleChange}
            className="h-5 w-5"
          />
          <span className="text-sm">
            I agree to the{" "}
            <button
              onClick={toggleTerms}
              className="text-light hover:underline font-bold"
            >
              terms and conditions
            </button>
          </span>
        </label>
        {formik.errors.terms && (
          <p className="text-red-500 text-sm pl-2">{formik.errors.terms}</p>
        )}
        {/* Login Button */}
        <button
          disabled={submitting}
          type="submit"
          className="font-main rounded-xl w-52 h-20 bg-light font-bold font-Inter text-dark hover:bg-transparent hover:text-light hover:border-2 hover:border-light transition-all ease-in-out duration-300"
        >
          Register
        </button>
        <h1 className="text-light">
          Existing User?{" "}
          <Link to="/signin" className="font-bold text-white">
            SignIn
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

export default Register;
