import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white/80 md:px-30 mt-10 w-full text-left">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center gap-3 w-full">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={assets.logo} alt="learny" className="w-10 lg:w-14" />
            <span className="text-2xl md:text-3xl font-bold text-blue-500">
              Learny
            </span>
          </div>
          <p className="mt-2 text-center md:text-left text-sm">
            A Learning Management System (LMS) that connects educators and
            students to learn new skills and share knowledge.
          </p>
        </div>
        <div className="flex flex-col w-full items-center md:items-start">
          <h1 className="text-lg font-semibold">Quick Links</h1>
          <ul className="flex flex-col gap-2 mt-3 w-full items-center md:items-start">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/course-list">Courses</Link>
            </li>
            <li>
              <Link to="/my-enrollments">My Enrollments</Link>
            </li>
            <li>
              <Link to="/my-courses">My Courses</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-full items-center md:items-start">
          <h1 className="text-lg font-semibold">Contact Us</h1>
          <ul className="flex flex-col gap-2 mt-3 w-full items-center md:items-start">
            <li className="flex items-center gap-2 text-2xl">
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <FaXTwitter />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="py-5 text-center text-sm">
        Copyright {new Date().getFullYear()} &copy;{" "}
        <span
          className="hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Learny
        </span>
        . All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
