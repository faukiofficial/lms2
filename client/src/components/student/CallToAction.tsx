import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const CallToAction: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
        <h1 className="text-3xl font-semibold text-gray-800">Learn anything, anytime, anywhere</h1>
        <p className="text-gray-600 text-base">Join our community of learners and unlock your potential</p>
        <div className="flex items-center gap-8 justify-center">
          <button className="bg-blue-500 px-10 py-3 rounded text-white cursor-pointer">Get Started</button>
          <button className="flex items-center gap-2 cursor-pointer font-semibold">Learn More <FaArrowRightLong /></button>
        </div>
    </div>
  )
}

export default CallToAction