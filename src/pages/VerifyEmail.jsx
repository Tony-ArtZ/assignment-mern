import React, { useEffect } from "react";
import { SiTicktick } from "react-icons/si";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import toast from "react-hot-toast";
import { UserContext } from "../App";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = React.useState(null);
  const token = searchParams.get("token") || "";
  let navigate = useNavigate();
  //Check if user is already logged in
  const [user] = React.useContext(UserContext);

  if (user) {
    navigate("/");
  }

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) throw new Error("Invalid token");

        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/email/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await res.json();
        console.log(data);

        if (data.error) {
          console.log(data.error);
          setError(data.error);
          toast.error(data.error.message);
          return;
        }

        console.log(data);
        toast.success("Email verified successfully");
      } catch (error) {
        console.log(error);
        toast.error("An error occurred");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <main className="grid place-items-center h-screen">
      <div className="w-72 md:w-80 md:bg-light p-5 md:bg-opacity-25 rounded-xl flex justify-center items-center flex-col gap-4">
        {token && !error ? (
          <>
            <SiTicktick className="text-9xl text-light" />
            <h1 className="w-full text-center text-5xl mb-4 text-light font-bold">
              Email Verified!
            </h1>
            <p className="text-light text-center">
              Thank you for verifying your email. You can now sign in to your
              account.
            </p>
            <Link
              to="/signin"
              className="flex justify-center items-center font-main rounded-xl w-52 h-20 bg-light font-bold font-Inter text-dark hover:bg-transparent hover:text-light hover:border-2 hover:border-light transition-all ease-in-out duration-300"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <RxCrossCircled className="text-9xl text-light" />
            <h1 className="w-full text-center text-5xl mb-4 text-light font-bold">
              Oops!
            </h1>
            <p className="text-light text-center">
              The email verification link is invalid or has expired. Please
              request a new one.
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

export default VerifyEmail;
