import { Link, Outlet } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const AdminDashboard = () => {
  const aLogout = async () => {
    await signOut(auth);
  };
  return (
    <>
      {/* admin nav bar  */}
      <div className=" flex flex-row min-h-[60px] items-center justify-around bg-orange-400 text-white sticky top-0 shadow-lg">
        <h1 className="text-[25px] font-semibold">Admin Dashboard</h1>

        <div className="flex flex-row items-center font-medium text-[20px] text-gray-200">
          <Link to="/admin">
            <h3 className="px-5 hover:text-orange-900 duration-500">Home</h3>
          </Link>
          <Link to="/admin/accept">
            <h3 className="px-5 hover:text-green-600 duration-500">Accepted</h3>
          </Link>
          <Link to="/admin/discuss">
            <h3 className="px-5 hover:text-sky-600 duration-500">Discussed</h3>
          </Link>
          <Link to="/admin/decline">
            <h3 className="px-5 hover:text-red-600 duration-500">Declined</h3>
          </Link>
          <Link to="/">
            <div
              onClick={aLogout}
              className="flex flex-row items-center bg-gray-500 text-white py-1 px-3 rounded-lg hover:scale-110 duration-500 ml-3 text-[16px]"
            >
              <MdLogout className="mr-1" />
              <button>Logout</button>
            </div>
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default AdminDashboard;
