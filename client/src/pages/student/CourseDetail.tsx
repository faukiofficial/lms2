import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICuorse } from "../../context/types";
import { useAppContext } from "../../context/useAppContext";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlayCircle,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { LuAlarmClock, LuClock } from "react-icons/lu";
import { MdOutlinePlayLesson } from "react-icons/md";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import Loading from "../../components/student/Loading";

const CourseDetail: React.FC = () => {
  const { id } = useParams();

  const [course, setCourse] = useState<ICuorse>({} as ICuorse);
  const [openSection, setOpenSection] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isEnrolled, setIsEnrolled] = useState<boolean>(true);
  const [playerData, setPlayerData] = useState<string | null>(null);

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    totalLecturesInCourse,
    currency,
  } = useAppContext();

  const fetchCourse = async () => {
    const course = allCourses.find((c) => c._id === id);
    setCourse(course as ICuorse);
  };

  useEffect(() => {
    fetchCourse();
  }, [allCourses]);

  const toggleSection = (index: number) => {
    setOpenSection((prevOpenSection) => ({
      ...prevOpenSection,
      [index]: !prevOpenSection[index],
    }));
  };

  return (
    <>
      {course ? (
        <div className="relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between px-4 sm:px-10 md:px-14 lg:px-30 md:pt-20 pt-10 text-left">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-100/70"></div>

          {/* left */}
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

            <p className="text-sm text-gray-500 mt-2">
              Course by{" "}
              <span className="font-semibold underline">
                {course.educator?.name ? course.educator?.name : "Unknown"}
              </span>
            </p>

            <div className="pt-8 text-gray-800">
              <h2 className="text-xl font-semibold">Course Structure</h2>

              <div className="pt-5">
                {course.courseContent?.map((chapter, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 bg-white mb-2 rounded"
                  >
                    <div
                      className="flex items-center justify-between p-3 cursor-pointer select-none"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center gap-2">
                        {openSection[index] ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                        <p className="font-medium md:text-base text-sm">
                          {chapter.chapterTitle}
                        </p>
                      </div>
                      <p className="md:text-base text-sm">
                        {chapter.chapterContent?.length} Lectures -{" "}
                        {calculateChapterTime(chapter)}
                      </p>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSection[index] ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <ul className="list-disc md:pl-10 pl-4 py-2 text-gray-600 border-t border-gray-300">
                        {chapter.chapterContent?.map((lecture, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 py-1"
                          >
                            <div className="flex items-center gap-2 justify-between w-full">
                              <div className="flex items-center gap-2 w-full">
                                <div className="">
                                  <FaPlayCircle />
                                </div>
                                <p className="font-medium md:text-base text-sm">
                                  {lecture.lectureTitle}
                                </p>
                              </div>
                              <div className="flex items-center justify-end gap-2 w-full pr-3">
                                {lecture.isPreviewFree && (
                                  <p
                                    className="md:text-base text-sm text-blue-500 cursor-pointer"
                                    onClick={() =>
                                      setPlayerData(
                                        lecture.lectureUrl.split("/").pop() ||
                                          ""
                                      )
                                    }
                                  >
                                    Preview
                                  </p>
                                )}
                                <p className="md:text-base text-sm">
                                  {lecture.lectureDuration &&
                                    humanizeDuration(
                                      lecture.lectureDuration * 60 * 1000,
                                      {
                                        units: ["h", "m"],
                                      }
                                    )}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-gray-800 mt-10">
              <h2 className="text-xl font-semibold">Course Description</h2>
              <p
                className="md:text-base text-sm rich-text"
                dangerouslySetInnerHTML={{
                  __html: course?.courseDescription || "",
                }}
              ></p>
            </div>
          </div>

          {/* right */}
          <div className="z-10 text-gray-800 rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] max-w-[420px] shadow-xl">
            {playerData ? (
              <div className="w-full h-96">
                <YouTube
                  videoId={playerData}
                  opts={{
                    playerVars: {
                      autoplay: 1,
                    },
                  }}
                  iframeClassName="w-full aspect-video"
                />
              </div>
            ) : (
              <img
                src={course.courseThumbnail}
                className="w-full"
                alt={course.courseTitle}
              />
            )}

            {playerData && (
              <div className="flex items-center justify-end">
                <span
                  className="text-sm px-5 mt-[-20px] text-right cursor-pointer text-red-500 hover:underline"
                  onClick={() => setPlayerData("")}
                >
                  End Preview
                </span>
              </div>
            )}

            <div className="p-5">
              <div className="flex items-center gap-2 text-red-500">
                <LuAlarmClock />
                <p className="md:text-base text-sm">
                  <span className="font-semibold">5 days</span> left at this
                  price!
                </p>
              </div>

              <div className="flex items-center gap-2 mt-5">
                <p className="md:text-3xl text-2xl font-semibold">
                  {currency}{" "}
                  {(course.discount
                    ? course.coursePrice * ((100 - course.discount) / 100)
                    : course.coursePrice || 0).toFixed(2)}
                </p>
                {course.discount && (
                  <div className="flex items-center gap-2">
                    <p className="md:text-base text-sm line-through">
                      {currency} {course.coursePrice}
                    </p>
                    <p className="md:text-base text-sm text-red-400">
                      {course.discount}% off
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 md:pt-4 text-gray-500 text-sm md:text-default">
                <div className="flex items-center gap-1">
                  <p>{calculateRating(course)}</p>
                  <div className="text-yellow-400">
                    <FaStar />
                  </div>
                </div>

                <div className="h-4 w-0.5 bg-gray-300"></div>
                <div className="flex items-center gap-1">
                  <LuClock />
                  <p>{calculateCourseDuration(course)}</p>
                </div>

                <div className="h-4 w-0.5 bg-gray-300"></div>

                <div className="flex items-center gap-1">
                  <MdOutlinePlayLesson />
                  <p>{totalLecturesInCourse(course)} Lectures</p>
                </div>
              </div>

              {isEnrolled ? (
                <button className="w-full bg-green-700 text-white py-2 mt-5 rounded cursor-pointer">
                  Enrolled, Learn Now
                </button>
              ) : (
                <button className="w-full bg-blue-500 text-white py-2 mt-5 rounded cursor-pointer">
                  Enroll Now
                </button>
              )}

              <div className="mt-5">
                <p className="font-semibold text-lg md:text-xl text-gray-800">
                  What's in the course?
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 md:text-base text-sm">
                  <li>Lifetime access to the course materials</li>
                  <li>Access to the discussion forum</li>
                  <li>Free Update</li>
                  <li>Free certificate on successful completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <Footer />
    </>
  );
};

export default CourseDetail;
