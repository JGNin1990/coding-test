import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientLogin = () => {
  const [clientEmail, setClientEmail] = useState("");
  const [clientPsw, setClientPsw] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const notify = (e) =>
    toast.error(`Password or email was wrong!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const handleClick = async (e) => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        clientEmail,
        clientPsw
      );
      // console.log(user);
      if (user.operationType) {
        setLoading(false);
        // console.log("okok");
        nav("/home");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      notify();
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full min-h-[100vh] bg-gray-400 flex flex-col items-center justify-center">
        <h1 className="text-[30px] font-semibold  mb-10">Client Login</h1>

        <div className="w-[500px] bg-white p-10 rounded-xl shadow-lg ">
          <div className="mb-5">
            <h4 className="text-gray-600 text-[16px] font-medium mb-[5px]">
              Client mail
            </h4>
            <input
              type="email"
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full bg-gray-300 rounded-md py-2 px-3 focus-visible:outline-none text-gray-800 font-semibold"
            />
          </div>
          <div className="mb-10">
            <h4 className="text-gray-600 text-[16px] font-medium mb-[5px]">
              Password
            </h4>
            <input
              type="password"
              onChange={(e) => setClientPsw(e.target.value)}
              className="w-full bg-gray-300 rounded-md py-2 px-3 focus-visible:outline-none text-gray-800 font-semibold"
            />
          </div>

          <div className=" flex flex-row items-center">
            <button
              className="bg-orange-500 text-white py-2 px-5 rounded-lg"
              onClick={handleClick}
            >
              Login
            </button>
            <div className="flex flex-row items-center text-gray-500 hover:text-orange-500 duration-500">
              <Link to={"/"} className="ml-3 mr-1">
                to admin login
              </Link>
              <AiOutlineDoubleRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientLogin;
