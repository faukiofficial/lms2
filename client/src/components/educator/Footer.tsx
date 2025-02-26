import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { FiGithub } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="text-center py-2 px-10 flex items-center justify-between gap-10 border-t border-gray-500/50">
      <div className="flex items-center gap-10">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={assets.logo} alt="logo" className="w-5 lg:w-8" />
          <span className="text-2xl md:text-3xl font-bold text-blue-500">
            Learny
          </span>
        </div>
        <div>
          &copy; {new Date().getFullYear()}{" "}
          <Link
            to="/"
            className="font-semibold hover:underline"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Learny
          </Link>
          . All rights reserved.
        </div>
      </div>

      <div className="flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/faukirijatulh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SlSocialLinkedin size={25} />
          </a>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/faukirijatul"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub size={25} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
