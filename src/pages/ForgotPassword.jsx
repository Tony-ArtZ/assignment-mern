import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import Input from "../components/Input";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { forgotSchema } from "../schema/forgot";

const ForgotPassword = () => {
  const [submitting, setSubmitting] = React.useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: async (values) => {
      try {
        if (submitting) return;
        setSubmitting(true);
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/forgot`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        });

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
        toast.success("Email sent successfully");
        navigate("/signin");
        setSubmitting(false);
      } catch (error) {
        console.log(error);
        toast.error("An error occurred");
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <main className="grid place-items-center h-screen">
        <form
          onSubmit={formik.handleSubmit}
          className="w-72 md:w-80 md:bg-light p-5 md:bg-opacity-25 rounded-xl flex justify-center items-center flex-col gap-4"
        >
          <h1 className="w-full text-center text-5xl mb-4 text-light font-bold">
            Reset Password?
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
          <button className="flex justify-center items-center font-main rounded-xl w-52 h-20 bg-light font-bold font-Inter text-dark hover:bg-transparent hover:text-light hover:border-2 hover:border-light transition-all ease-in-out duration-300">
            Send Email
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

export default ForgotPassword;
