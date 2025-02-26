import React, { useEffect, useState } from "react";
import { IChapterContent, ICuorse } from "../../context/types";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player: React.FC = () => {
  const { id } = useParams();

  const [course, setCourse] = useState<ICuorse>({} as ICuorse);
  const [playerData, setPlayerData] = useState<IChapterContent | null>(null);

  const { enrolledCourses, calculateChapterTime } = useAppContext();

  const fetchCourse = async () => {
    const course = enrolledCourses.find((c) => c._id === id);
    setCourse(course as ICuorse);
  };

  useEffect(() => {
    fetchCourse();
  }, [enrolledCourses]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [playerData]);

  console.log(course);

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse xl:flex-row w-full min-h-[calc(100vh-430px)] gap-10 items-center xl:items-start">
        {/* left */}
        <div className="text-gray-800 mt-10 lg:mt-0 w-full xl:max-w-[600px]">
          <h2 className="text-2xl font-semibold">{course?.courseTitle}</h2>
          <p className="text-sm text-gray-600">By {course?.educator?.name}</p>

          <div className="pt-5">
            {course &&
              course?.courseContent?.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterOrder}. {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="md:text-base text-sm">
                      {chapter.chapterContent?.length} Lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div className="overflow-hidden">
                    <ul className="list-disc md:pl-10 pl-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent?.map((lecture, index) => (
                        <li key={index} className="flex items-start gap-2 py-1">
                          <div className="flex items-center gap-2 justify-between w-full">
                            <div
                              className="flex items-center gap-2 w-full cursor-pointer"
                              onClick={() => setPlayerData(lecture)}
                            >
                              <div className="">
                                {lecture ? (
                                  <div className="text-blue-500">
                                    <FaCheckCircle />
                                  </div>
                                ) : (
                                  <FaPlayCircle />
                                )}
                              </div>
                              <p
                                className={`font-medium md:text-base text-sm hover:font-bold ${
                                  lecture.lectureId === playerData?.lectureId
                                    ? "text-blue-500"
                                    : ""
                                }`}
                              >
                                {lecture.lectureOrder}. {lecture.lectureTitle}
                              </p>
                            </div>
                            <div className="flex items-center justify-end gap-2 w-full pr-3">
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

          <div className="flex items-center gap-2 mt-6">
            <h1 className="text-xl font-semibold">Rate this course:</h1>
            <Rating initialRating={0} />
          </div>
        </div>

        {/* right */}
        <div className="w-full mt-0 xl:mt-9">
          {playerData ? (
            <div>
              <p className="text-2xl font-medium mb-2 text-center">
                {playerData.lectureTitle}
              </p>
              <YouTube
                key={playerData.lectureId}
                videoId={playerData.lectureUrl.split("/").pop()}
                opts={{
                  playerVars: {
                    autoplay: 1,
                  },
                }}
                iframeClassName="w-full aspect-video h-full  border border-gray-300"
              />

              <div className="flex justify-end mt-2">
                <button className="bg-blue-500 px-4 py-2 rounded text-white cursor-pointer">
                  Complete & Continue
                </button>
              </div>
            </div>
          ) : (
            <img
              src={course?.courseThumbnail}
              className="w-full"
              alt={course?.courseTitle}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Player;
