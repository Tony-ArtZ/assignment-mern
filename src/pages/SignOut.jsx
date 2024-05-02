import React from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { IoCaretBackCircle } from "react-icons/io5";

const SignOut = () => {
  let navigate = useNavigate();
  const [user, setUser] = React.useContext(UserContext);

  if (!user) {
    navigate("/signin");
  }

  const signOut = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        navigate("/signin");
      }
      localStorage.removeItem("auth-token");
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="grid place-items-center h-screen">
      <div className="w-full absolute top-8 px-12">
        <button
          onClick={() => navigate("/")}
          className="text-light flex justify-center items-center gap-4 hover:underline transition-all font-bold text-2xl"
        >
          <IoCaretBackCircle className="inline-block text-4xl" />
          Back
        </button>
      </div>
      <div className="w-72 md:w-80 md:bg-light p-5 md:bg-opacity-25 rounded-xl flex justify-center items-center flex-col gap-4">
        <FaSignOutAlt className="text-9xl text-light" />
        <h1 className="w-full text-center text-5xl mb-4 text-light font-bold">
          Sign Out?
        </h1>
        <p className="text-light text-center">
          Are you sure you want to sign out of your account?
        </p>
        <button
          onClick={signOut}
          className="flex justify-center items-center font-main rounded-xl w-52 h-20 bg-light font-bold font-Inter text-dark hover:bg-transparent hover:text-light hover:border-2 hover:border-light transition-all ease-in-out duration-300"
        >
          Signout
        </button>
      </div>
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

export default SignOut;
