import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";
import { db } from "../firebase";
import { addReports } from "../store/slicers/reportData";

const ClientHistory = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const reports = useSelector((state) => state.data);
  const reportsCollectionRef = collection(db, "reports");
  const dispatch = useDispatch();

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

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="bg-gray-300 w-full relative">
        <div className="w-[80%] mx-auto  min-h-[100vh] py-5  ">
          <h1 className="text-[30px] font-semibold text-orange-500 text-center">
            Report History
          </h1>
          <div
            onClick={() => nav(-1)}
            className="absolute top-[2%] right-[1%] flex flex-row items-center bg-gray-500 text-white py-2 px-5 rounded-lg hover:scale-110 duration-500 cursor-pointer"
          >
            <MdOutlineArrowBack className="mr-1" />
            <button>Back</button>
          </div>
          {/* for history show */}
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex flex-row justify-around py-10 my-5 bg-white rounded-md shadow-lg"
            >
              <div className="w-[60%]">
                <h1 className="text-[22px] text-gray-600 font-medium">
                  Client Name :
                  <span className="ml-10 text-orange-500 font-semibold">
                    {report.name}
                  </span>
                </h1>
                <h1 className="text-[22px] text-gray-600 font-medium">
                  Email :
                  <span className="ml-[105px] text-[20px]">{report.email}</span>
                </h1>
                <h1 className="text-[22px] text-gray-600 font-medium">
                  Issue Type :
                  <span className="ml-[63px] text-[20px]">{report.type}</span>
                </h1>
                <h1 className="text-[22px] text-gray-600 font-medium">
                  Issue Detail :
                  <span className="ml-[50px] text-[19px] text-gray-500">
                    {report.detail}
                  </span>
                </h1>
              </div>
              <div className="w-[30%] flex flex-row justify-center items-center text-[22px] font-semibold">
                {report.receive && (
                  <div className="bg-gray-500 text-white py-2 px-5 rounded-md flex flex-row items-center text-[20px] font-medium">
                    Received
                  </div>
                )}
                {report.pending && (
                  <div className="text-green-500 py-2 px-5 rounded-md flex flex-row items-center ">
                    We agree your request and will service soon . . .
                  </div>
                )}
                {report.discuss && (
                  <div className="text-blue-500 py-2 px-5 rounded-md flex flex-row items-center ">
                    We need to discuss your request and will response soon . . .
                  </div>
                )}
                {report.decline && (
                  <div className="text-red-500 py-2 px-5 rounded-md flex flex-row items-center ">
                    Sorry! we can't take responsibility.
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* <div className="flex flex-row justify-around py-10 my-5 bg-white rounded-md shadow-lg">
            <div className="w-[60%]">
              <h1 className="text-[22px] text-gray-600 font-medium">
                Client Name :
                <span className="ml-10 text-orange-500 font-semibold">
                  ko ee
                </span>
              </h1>
              <h1 className="text-[22px] text-gray-600 font-medium">
                Email :
                <span className="ml-[105px] text-[20px]">ee@gmail.com</span>
              </h1>
              <h1 className="text-[22px] text-gray-600 font-medium">
                Issue Type :<span className="ml-[63px] text-[20px]">eee</span>
              </h1>
              <h1 className="text-[22px] text-gray-600 font-medium">
                Issue Detail :
                <span className="ml-[50px] text-[19px] text-gray-500">
                  asdfad
                </span>
              </h1>
            </div>
            <div className="w-[30%] flex flex-row justify-center items-center">
              <div className="">
                <div className="bg-gray-500 text-white py-2 px-5 rounded-md flex flex-row items-center text-[20px]">
                  Accepted
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ClientHistory;
