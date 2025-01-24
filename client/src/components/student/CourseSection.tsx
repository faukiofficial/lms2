import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import React from "react";
import { useAppContext } from "../../context/useAppContext";

const CourseSection: React.FC = () => {
  const { allCourses } = useAppContext();
  return (
    <div className="py-16 md:px-30 px-8">
      <h2 className="text-3xl font-medium text-gray-800">Learn from the best</h2>
      <p className="text-sm md:text-base text-gray-600 mt-3">
        Discover our top-rated courses across various categories. From coding
        and design to<br />business and wellness, our courses are crafted to deliver
        results.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10 md:my-16">
        {
          allCourses.slice(0,4).map((course) => <CourseCard course={course} key={course._id} />)
        }
      </div>


      <Link to="course-list" onClick={() => window.scrollTo(0, 0)} className="text-gray-500 border border-gray-500 px-10 py-2 cursor-pointer rounded">Show All Courses</Link>
    </div>
  );
};

export default CourseSection;
