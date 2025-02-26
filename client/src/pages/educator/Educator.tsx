import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/educator/Navbar";
import Sidebar from "../../components/educator/Sidebar";
import Footer from "../../components/educator/Footer";

const Educator: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Educator;
