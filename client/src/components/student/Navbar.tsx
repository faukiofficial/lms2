import React from "react";
import { assets } from "../../assets/assets.ts";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { UserButton, useUser, useClerk } from "@clerk/clerk-react";

type Props = {};

const Navbar = (props: Props) => {
  const isCourseListPage = window.location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        src={assets.logo}
        alt="logo"
        className="w-10 lg:w-14 cursor-pointer"
      />

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button className="cursor-pointer">Become Educator</button> |{" "}
              <Link to="/my-enrollments">My Enrollments</Link>
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
            Create Account
          </button>
        )}
      </div>

      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button className="cursor-pointer">Become Educator</button> |{" "}
              <Link to="/my-enrollments">My Enrollments</Link>
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
