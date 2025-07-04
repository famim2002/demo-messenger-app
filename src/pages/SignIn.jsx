import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loggedUser } from "../reduxStore/slices/authSlices";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const auth = getAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const reduxData = useSelector((state) => state.userData.userInfo);

  

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          toast.error("verify your email before sign in...!");
        } else {
          dispatch(loggedUser(userCredential.user));
          toast.success("signed in successfully...!");
           setTimeout(() => {
             navigate("/");
           }, 1500);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  if (reduxData) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen w-full bg-[#202020] flex items-center justify-center p-4">
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <form
        className="bg-white w-full max-w-md px-8 py-12 rounded-2xl shadow-xl flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
      >
        <h1 className="text-center text-3xl text-[#0b0b0b] font-bold">
          <span className="text-[50px] "> Sign-In</span> <br /> to <br /> your
          account
        </h1>

        <div className="relative mb-8 group">
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, email: e.target.value }));
            }}
            className="w-full text-lg px-1 pt-4 pb-1 border-b-2 border-gray-300 focus:outline-none focus:border-[#0b0b0b] peer"
          />
          <label
            htmlFor="email"
            className="absolute left-1 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#0b0b0b] peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#0b0b0b] bg-white px-1"
          >
            Email
          </label>
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#0b0b0b] group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </div>

        <div className="relative mb-8 group">
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, password: e.target.value }));
            }}
            className="w-full text-lg px-1 pt-4 pb-1 border-b-2 border-gray-300 focus:outline-none focus:border-[#0b0b0b] peer"
          />
          <label
            htmlFor="password"
            className="absolute left-1 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#0b0b0b] peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#0b0b0b] bg-white px-1"
          >
            Password
          </label>
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#0b0b0b] group-hover:w-full transition-all duration-300 ease-in-out transform -translate-x-1/2"></span>
        </div>

        <Link to="/SignUp">
          <p className="text-center ">
            don't have an account{" "}
            <span className="text-2xl underline hover:text-blue-600 pl-2">SignUp</span>
          </p>
        </Link>

        <button
          type="submit"
          onClick={handleSignIn}
          className="bg-[#292727] text-white py-3 rounded-full text-lg cursor-pointer hover:bg-[#0b0b0b] transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
