import { assets } from "../../assets/assets.ts";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { UserButton, useUser, useClerk } from "@clerk/clerk-react";
import { useAppContext } from "../../context/useAppContext.ts";

const Navbar: React.FC = () => {
  const { isEducator } = useAppContext();
  const navigate = useNavigate();
  const isCourseListPage = window.location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={assets.logo} alt="logo" className="w-10 lg:w-14" />
        <span className="text-2xl md:text-3xl font-bold text-blue-500">
          Learny
        </span>
      </div>

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                onClick={() => navigate("/educator/dashboard")}
                className="cursor-pointer"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-500 px-6 py-2 rounded-full text-white cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button
                onClick={() => navigate("/educator")}
                className="cursor-pointer"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button className="cursor-pointer" onClick={() => openSignIn()}>
            <FaRegUserCircle size={25} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
