import React from "react";
import { ICuorse, useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

type Props = {
  course: ICuorse;
};

const CourseCard: React.FC<Props> = ({ course }) => {
  const { currency, calculateRating } = useAppContext();

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="border border-gray-500/30 rounded-lg shadow-md flex flex-col"
    >
      <img
        className="w-full rounded-t-lg"
        src={course.courseThumbnail}
        alt=""
      />
      <div className="p-4 text-left flex flex-col justify-between flex-grow">
        <h3 className="text-base font-semibold line-clamp-2">
          {course.courseTitle}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-600">{course.educator.name}</p>
          <div className="flex items-center gap-2">
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
          </div>
          <p className="text-lg font-semibold mt-2 text-gray-800">
            {currency}{" "}
            {(course.discount
              ? course.coursePrice -
                (course.coursePrice * course.discount) / 100
              : course.coursePrice
            ).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
