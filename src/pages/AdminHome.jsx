import React, { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addReports } from "../store/slicers/reportData";

const AdminHome = () => {
  const [loading, setLoading] = useState(false);
  const reports = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const reportsCollectionRef = collection(db, "reports");

  const successNotify = (e) =>
    toast.success(`Successfully! ${e}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const updateAccept = async (id, pending) => {
    const pendingDoc = doc(db, "reports", id);
    await updateDoc(pendingDoc, { pending: true, receive: false });
    successNotify("Accept");
    // console.log(id, pending);
  };
  const updateDiscuss = async (id, discuss) => {
    const discussDoc = doc(db, "reports", id);
    await updateDoc(discussDoc, { discuss: true, receive: false });
    successNotify("Discuss");

    // console.log(id, discuss);
  };
  const updateDecline = async (id, decline) => {
    const declineDoc = doc(db, "reports", id);
    await updateDoc(declineDoc, { decline: true, receive: false });
    successNotify("Decline");

    // console.log(id, decline);
  };

  useEffect(() => {
    const getReport = async () => {
      setLoading(true);
      const data = await getDocs(reportsCollectionRef);
      // console.log(data);
      dispatch(
        addReports(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      // setReports(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getReport();
  }, []);

  // console.log(reports);
  // console.log(reports);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-gray-300 w-full ">
        <div className="w-[80%] mx-auto  min-h-[100vh] py-5  ">
          <ToastContainer />
          {/* for feedback check */}
          {reports.map(
            (d) =>
              d.receive && (
                <div
                  key={d.id}
                  className="flex flex-row justify-around py-10 my-5 bg-white rounded-md shadow-lg"
                >
                  <div className="w-[60%] ">
                    <h1 className="text-[22px] text-gray-600 font-medium">
                      Client Name :
                      <span className="ml-10 text-orange-500 font-semibold">
                        {d.name}
                      </span>
                    </h1>
                    <h1 className="text-[22px] text-gray-600 font-medium">
                      Email :
                      <span className="ml-[105px] text-[20px]">{d.email}</span>
                    </h1>
                    <h1 className="text-[22px] text-gray-600 font-medium">
                      Issue Type :
                      <span className="ml-[63px] text-[20px]">{d.type}</span>
                    </h1>
                    <h1 className="text-[22px] text-gray-600 font-medium">
                      Issue Detail :
                      <span className="ml-[50px] text-[19px] text-gray-500">
                        {d.detail}
                      </span>
                    </h1>
                  </div>
                  <div
                    className="w-[30%] font-semibold flex flex-row flex-wrap" // console.log(id, pending);
                  >
                    <div
                      onClick={() => updateAccept(d.id, d.pending)}
                      className="mx-5 hover:scale-110 duration-500"
                    >
                      <button className="bg-green-500 text-white py-2 px-5 rounded-lg flex flex-row items-center">
                        <FaCheck className="mr-2" />
                        Accept
                      </button>
                    </div>
                    <div
                      onClick={() => updateDiscuss(d.id, d.discuss)}
                      className="mx-5 hover:scale-110 duration-500"
                    >
                      <button className="bg-blue-500 text-white py-2 px-5 rounded-lg flex flex-row items-center">
                        <FaQuestionCircle className="mr-2" />
                        Discuss
                      </button>
                    </div>
                    <div
                      onClick={() => updateDecline(d.id, d.decline)}
                      className="mx-5 hover:scale-110 duration-500"
                    >
                      <button className="bg-red-500 text-white py-2 px-5 rounded-lg flex flex-row items-center">
                        <ImCross className="mr-2" />
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
