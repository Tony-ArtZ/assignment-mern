import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { UserContext } from "../App";
import Loader from "../components/Loader";
import { RxCrossCircled } from "react-icons/rx";

const ResendEmail = () => {
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const [setError] = React.useState(null);
  const email = searchParams.get("email") || "";
  let navigate = useNavigate();

  //Check if user is already logged in
  const [user] = React.useContext(UserContext);

  if (user) {
    navigate("/");
  }

  const resendEmail = async () => {
    if (submitting) return;
    setSubmitting(true);
    if (!email) {
      setError(new Error("Invalid data provided"));
      toast.error("Invalid data provided");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/email/resend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      console.log(data);
      setSubmitting(false);

      if (data.error) {
        console.log(data.error);
        setError(data.error);
        toast.error(data.error.message);
        return;
      }

      console.log(data);
      toast.success("Email Sent!");
      navigate("/signin");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
      setSubmitting(false);
    }
  };

  return (
    <main className="grid place-items-center h-screen">
      <div className="w-72 md:w-80 md:bg-light p-5 md:bg-opacity-25 rounded-xl flex justify-center items-center flex-col gap-4">
        {email ? (
          <>
            <h1 className="w-full text-center text-5xl mb-4 text-light font-bold">
              Email not verified!
            </h1>
            <p className="text-light text-center">
              Do you want to resend the verification email?
            </p>
            {email && (
              <p className="text-light text-center">
                Email will be sent to{" "}
                <span className="text-white font-bold">{email}</span>
              </p>
            )}
            <button
              onClick={resendEmail}
              className="flex justify-center items-center font-main rounded-xl w-52 h-20 bg-light font-bold font-Inter text-dark hover:bg-transparent hover:text-light hover:border-2 hover:border-light transition-all ease-in-out duration-300"
            >
              {!submitting ? (
                <h1>Resend</h1>
              ) : (
                <Loader width={40} height={40} />
              )}
            </button>
          </>
        ) : (
          <>
            <RxCrossCircled className="text-9xl text-light" />
            <h1 className="w-full text-center text-5xl mb-4 text-light font-bold">
              Oops!
            </h1>
            <p className="text-light text-center">
              Something went wrong. Please try again.
            </p>
          </>
        )}
      </div>
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
  );
};

export default ResendEmail;
