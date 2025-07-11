import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControlLabel } from "@mui/material";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import OtpBox from "../../Components/OtpBox";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";


const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const history = useNavigate();
  const context = useContext(MyContext);

  const verifyOTP = (e) => {
    e.preventDefault();

    const actionType = localStorage.getItem("actionType");

     if (actionType === "forgot-password") {
         postData("/api/user/verify-forgot-password-otp", {
           email: localStorage.getItem("userEmail"),
           otp: otp,
         }).then((res) => {
           if (res?.error === false) {
             context.alertBox(
               "success",
               res?.message || "OTP verified successfully"
             );
             history("/forgot-password");
           } else {
             context.alertBox("error", res?.message || "Verification failed");
           }
         });
       } else {
         postData("/api/user/verifyEmail", {
           email: localStorage.getItem("userEmail"),
           otp: otp,
         }).then((res) => {
           if (res?.error === false) {
             context.alertBox(
               "success",
               res?.message || "Email verified successfully"
             );
             localStorage.removeItem("userEmail");
             localStorage.removeItem("actionType");
             history("/login");
           } else {
             context.alertBox("error", res?.message || "Verification failed");
           }
         });
       }
  };

  return (
    <section className="bg-white w-full h-[100vh]">
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img src="/logo.png" className="w-[160px]" />
        </Link>

        <div className="flex items-center gap-0">
          <NavLink to="/login" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <CgLogIn className="text-[18px]" />
              Login
            </Button>
          </NavLink>
          <NavLink to="/sign-up">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <FaRegUser className="text-[15px]" />
              Sign Up
            </Button>
          </NavLink>
        </div>
      </header>
      <img
        src="/login-bg.webp"
        className="w-full fixed top-0 left-0 opacity-5"
      />

      <div className="loginBox card w-[600px] h-[auto] pb-20 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img src="/verify.png" className="w-[100px] m-auto" />
        </div>
        <h1 className="text-center text-[35px] font-[800] mt-4">
          Welcome Back! <br />
          Please Verify your Email
        </h1>

        <br />

        <p className="text-center text-[15px]">
          OTP send to
          <span className="text-[#3872fa] font-bold">
            {localStorage.getItem("userEmail")}
          </span>
        </p>

        <br />

        <form onSubmit={verifyOTP}>
          <div className="text-center flex items-center justify-center flex-col">
            <OtpBox length={6} onChange={handleOtpChange} />
          </div>

          <br />
          <div className="m-auto w-[300px]">
            <Button type="submit" className="btn-blue w-full">
              Verify OTP
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VerifyAccount;
