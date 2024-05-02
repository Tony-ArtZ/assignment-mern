import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";
import React, { useEffect, useState } from "react";
import SignOut from "./pages/SignOut";
import ResendEmail from "./pages/ResendEmail";
import CreatePost from "./pages/CreatePost";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const getUser = async () => {
        try {
          const res = await fetch("http://localhost:3000/auth/get-user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          if (data.error) {
            localStorage.removeItem("auth-token");
            setUser(null);
          }
          setUser(data);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<CreatePost />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<Register />}></Route>
            <Route path="/signout" element={<SignOut />}></Route>
            <Route path="/verify-email" element={<VerifyEmail />}></Route>
            <Route path="/resend-email" element={<ResendEmail />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </UserContext.Provider>
    </>
  );
}

export default App;
