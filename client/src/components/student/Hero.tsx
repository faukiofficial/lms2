import React from "react";
import SearchBar from "./SearchBar";

const Hero : React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
      <h1 className="md:text-4xl text-2xl font-bold text-gray-800 max-w-3xl mx-auto">
        Empower yout future with the courses designed to{" "}
        <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] bg-clip-text text-transparent">fit your choice.</span>
      </h1>
      <p className="text-gray-600 md:block hidden max-w-2xl mx-auto">
        We bring together world-class instructors, interactive content, and a
        supportive community to help you achieve your personal and professional
        goals.
      </p>

      <p className="text-gray-600 md:hidden block max-w-sm mx-auto">
        We bring together world-class instructors to help you achieve your
        professional goals.
      </p>

      <SearchBar />
    </div>
  );
};

export default Hero;
