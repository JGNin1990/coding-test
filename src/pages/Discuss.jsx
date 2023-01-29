import { useSelector } from "react-redux";

const Discuss = () => {
  const reports = useSelector((state) => state.data);
  // console.log(reports);
  return (
    <>
      <div className="bg-gray-300 w-full ">
        <div className="w-[80%] mx-auto  min-h-[100vh] py-5  ">
          <h1 className="text-[30px] font-semibold text-sky-500 text-center">
            Issue for disscussion
          </h1>
          {/* for feedback check */}
          {reports.map(
            (report) =>
              report.discuss && (
                <div
                  key={report.id}
                  className=" p-10 my-5 bg-blue-200 rounded-md shadow-lg"
                >
                  <h1 className="text-[22px] text-gray-600 font-medium">
                    Client Name :
                    <span className="ml-10 text-orange-500 font-semibold">
                      {report.name}
                    </span>
                  </h1>
                  <h1 className="text-[22px] text-gray-600 font-medium">
                    Email :
                    <span className="ml-[105px] text-[20px]">
                      {report.email}
                    </span>
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
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Discuss;
