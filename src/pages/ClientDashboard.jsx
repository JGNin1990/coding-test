import { signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlineHistory } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import ReactTextareaAutosize from "react-textarea-autosize";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientDashboard = () => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [NewType, setNewType] = useState("");
  const [newDetail, setNewDetail] = useState("");

  const reportsCollectionRef = collection(db, "reports");

  const successNotify = () =>
    toast.success("Report send successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  const failNotify = () =>
    toast.error("You need to fill all data!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const cLogout = async () => {
    await signOut(auth);
  };

  const sendReport = async () => {
    if (newName && newEmail && NewType && newDetail) {
      await addDoc(reportsCollectionRef, {
        name: newName,
        email: newEmail,
        type: NewType,
        detail: newDetail,
        pending: false,
        decline: false,
        discuss: false,
        receive: true,
      });
      successNotify();
      setNewName("");
      setNewEmail("");
      setNewType("");
      setNewDetail("");
    } else {
      failNotify();
    }
  };

  // console.log(name,email,type,detail)
  return (
    <>
      <ToastContainer />
      {/* client site nav bar */}
      <div className=" flex flex-row min-h-[60px] items-center justify-around bg-orange-400 text-white">
        <h1 className="text-[25px] font-semibold">Client site</h1>

        {/* history */}
        <div className="flex flex-row">
          <Link to="/history">
            <div className="flex flex-row items-center bg-gray-500 text-white py-2 px-5 rounded-lg hover:scale-110 duration-500">
              <AiOutlineHistory className="mr-1" />
              <button>History</button>
            </div>
          </Link>
          {/* logout */}
          <Link to="/">
            <div
              onClick={cLogout}
              className="flex flex-row items-center bg-gray-500 text-white py-2 px-5 rounded-lg hover:scale-110 duration-500 ml-3"
            >
              <MdLogout className="mr-1" />
              <button>Logout</button>
            </div>
          </Link>
        </div>
      </div>

      {/* client site body */}
      <div className="w-[80%] mx-auto">
        {/* name */}
        <div className="mb-5 mt-10">
          <h4 className="text-gray-600 text-[16px] font-semibold mb-[5px]">
            Client Name
          </h4>
          <input
            value={newName}
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            className=" w-[300px] bg-gray-300 rounded-md py-2 px-3 focus-visible:outline-none text-gray-800 font-semibold"
          />
        </div>
        {/* email */}
        <div className="mb-5">
          <h4 className="text-gray-600 text-[16px] font-semibold mb-[5px]">
            Email
          </h4>
          <input
            value={newEmail}
            type="email"
            onChange={(e) => setNewEmail(e.target.value)}
            className=" w-[300px] bg-gray-300 rounded-md py-2 px-3 focus-visible:outline-none text-gray-800 font-semibold"
          />
        </div>
        {/* issue type */}
        <div className="mb-5">
          <h4 className="text-gray-600 text-[16px] font-semibold mb-[5px]">
            Issue Type
          </h4>
          <input
            value={NewType}
            type="text"
            onChange={(e) => setNewType(e.target.value)}
            className=" w-[300px] bg-gray-300 rounded-md py-2 px-3 focus-visible:outline-none text-gray-800 font-semibold"
          />
        </div>
        {/* description */}
        <div className="">
          <h4 className="text-gray-600 text-[16px] font-semibold mb-[5px]">
            Issue Detail
          </h4>
          <ReactTextareaAutosize
            value={newDetail}
            name="message"
            onChange={(e) => setNewDetail(e.target.value)}
            className="w-[450px] bg-gray-300 rounded-md px-3 py-3 focus-visible:outline-none text-gray-800 font-semibold text-sm  "
            placeholder="Text here"
          />
        </div>

        {/* submit button  */}
        <div className="mt-10">
          <button
            onClick={sendReport}
            className="bg-orange-500 text-white py-2 px-5 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
