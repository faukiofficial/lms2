import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 py-2 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 bg-white">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={assets.logo} alt="logo" className="w-10 lg:w-14" />
        <span className="text-2xl md:text-3xl font-bold text-blue-500">
          Learny
        </span>
      </div>

      <div className="flex items-center gap-4">
        <p>Hi {user?.firstName || "Developer"}</p>

        {user ? <UserButton /> : <SignInButton />}
      </div>
    </div>
  );
};

export default Navbar;
