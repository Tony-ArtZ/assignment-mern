import React from "react";
import { MdOutlineLock } from "react-icons/md";
import Password from "../components/Password";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { resetSchema } from "../schema/reset";
import { UserContext } from "../App";
import Loader from "../components/Loader";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = React.useState(null);
  const token = searchParams.get("token") || "";

  //Check if user is already logged in
  const navigate = useNavigate();
  const [user] = React.useContext(UserContext);

  if (user) {
    navigate("/");
  }

  const formik = useFormik(
    {
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: resetSchema,
      onSubmit: async (values) => {
        try {
          if (submitting) return;
          if (!token) throw new Error("Invalid token");
          setSubmitting(true);
          const res = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/password/reset`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token, password: values.password }),
            }
          );

          const data = await res.json();
          console.log(data);

          if (data.error) {
            console.log(data.error);
            setSubmitting(false);
            // setError(data.error);
            toast.error(data.error.message);
            return;
          }

          console.log(data);
          toast.success("Password reset successfully");
          navigate("/signin");
          setSubmitting(false);
        } catch (error) {
          console.log(error);
          toast.error("An error occurred");
          setSubmitting(false);
        }
      },
    },
    [token]
  );

  return (
    <div>
      <main className="grid place-items-center h-screen">
        <form
          onSubmit={formik.handleSubmit}
          className="w-72 md:w-80 md:bg-light p-5 md:bg-opacity-25 rounded-xl flex justify-center items-center flex-col gap-4"
        >
          <h1 className="w-full text-center text-5xl mb-4 text-light font-bold">
            Enter new password
          </h1>
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
          <Password
            name="confirmPassword"
            type="password"
            disabled={submitting}
            label="Confirm Password"
            Icon={MdOutlineLock}
            error={formik.errors.confirmPassword}
            onChange={formik.handleChange}
          />
          <button
            type="submit"
            className="flex justify-center items-center font-main rounded-xl w-52 h-20 bg-light font-bold font-Inter text-dark hover:bg-transparent hover:text-light hover:border-2 hover:border-light transition-all ease-in-out duration-300"
          >
            {!submitting ? <h1>Reset</h1> : <Loader width={40} height={40} />}
          </button>
        </form>
        {/* Background */}
        <div className="bg-stars fixed h-full w-full bg-repeat -z-20 bg-[20px]" />
        <div className="bg-twinkling animate-twinkle fixed h-full w-[3000px] bg-repeat -z-10" />
        <img
          src="bg.svg"
          alt="background"
          width={1500}
          height={1500}
          className="fixed bottom-0 object-cover w-screen h-40 -z-10 xl:h-fit"
        />
      </main>
    </div>
  );
};

export default ResetPassword;
