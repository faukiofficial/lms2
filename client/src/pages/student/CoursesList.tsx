import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/student/SearchBar";
import { useAppContext } from "../../context/useAppContext";
import CourseCard from "../../components/student/CourseCard";
import { ICuorse } from "../../context/types";
import { IoMdClose } from "react-icons/io";
import Footer from "../../components/student/Footer";

const CoursesList: React.FC = () => {
  const navigate = useNavigate();
  const { allCourses, searchQuery, setSearchQuery, setTempQuery } = useAppContext();
  const [filteredCourses, setFilteredCourses] = useState<ICuorse[]>([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      if (searchQuery) {
        setFilteredCourses(
          tempCourses.filter((course) =>
            course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredCourses(tempCourses);
      }
    }
  }, [allCourses, searchQuery]);
  
  return (
    <div className="min-h-screen">
      <div className="relative px-4 md:px-8 lg:px-30 text-left pt-12">
        <div className="flex md:flex-row flex-col gap-6 items-center justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar />
        </div>
        {searchQuery && (
          <div className="flex items-center text-gray-800/90 gap-2 w-fit border py-1 px-3 rounded border-gray-400/50 mt-5">
            {searchQuery}
            <div
              onClick={() => {
                navigate("/course-list");
                setSearchQuery("");
                setTempQuery("");
              }}
              className="cursor-pointer text-red-400"
            >
              <IoMdClose />
            </div>
          </div>
        )}
        <div className="my-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredCourses.length > 0 &&
            filteredCourses.map((course) => (
              <CourseCard course={course} key={course._id} />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursesList;
