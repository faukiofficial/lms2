import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICuorse } from "../../context/types";
import { useAppContext } from "../../context/useAppContext";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const CourseDetail: React.FC = () => {
  const { id } = useParams();

  const [course, setCourse] = useState<ICuorse>({} as ICuorse);

  const { allCourses, calculateRating } = useAppContext();

  const fetchCourse = async () => {
    const course = allCourses.find((c) => c._id === id);
    setCourse(course as ICuorse);
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between px-4 sm:px-10 md:px-14 lg:px-30 md:pt-30 pt-20 text-left">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-100/70"></div>

      <div className="max-w-xl text-gray-500 z-10 space-y-2">
        <h1 className="ms:text-4xl text-3xl font-semibold text-gray-800">
          {course?.courseTitle}
        </h1>
        <p
          className="pt-4 md:text-base text-sm"
          dangerouslySetInnerHTML={{
            __html: course?.courseDescription?.slice(0, 200) || "",
          }}
        ></p>

        <div className="flex items-center gap-4 mt-3">
          <p>{calculateRating(course)}</p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => {
              const rating = calculateRating(course);
              const fullStars = Math.floor(rating);
              const isHalfStar = rating % 1 !== 0;

              return (
                <span key={index} className="text-sm text-yellow-400">
                  {rating === 0.0 ? (
                    <FaRegStar />
                  ) : index < fullStars ? (
                    <FaStar />
                  ) : index === fullStars && isHalfStar ? (
                    <FaStarHalfAlt />
                  ) : (
                    <FaRegStar />
                  )}
                </span>
              );
            })}
          </div>
          <p className="text-sm text-gray-500">
            {course.courseRatings?.length} Rating(s)
          </p>
          <p className="text-sm text-gray-500">
            {course.enrolledStudents?.length} Students
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-2">Course by <span className="font-semibold underline">{course.educator?.name}</span></p>
      </div>
      <div></div>
    </div>
  );
};

export default CourseDetail;
