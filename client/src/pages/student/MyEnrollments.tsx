import React from "react";
import { useAppContext } from "../../context/useAppContext";
import { useNavigate } from "react-router-dom";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

type Props = {};

const MyEnrollments = (props: Props) => {
  const { enrolledCourses, calculateCourseDuration } = useAppContext();
  const navigate = useNavigate();

  const [progressArray, setProgressArray] = React.useState<
    { lectureCompleted: number; totalLectures: number }[]
  >([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 7 },
    { lectureCompleted: 5, totalLectures: 5 },
    { lectureCompleted: 1, totalLectures: 3 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 4 },
  ]);
  return (
    <>
      <div className="px-8 md:px-30 pt-10 relative flex flex-col">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-100/70"></div>

        <div className="z-10 space-y-2">
          <h1 className="text-3xl font-semibold text-gray-800">
            My Enrollments
          </h1>
          <table className="md:table-auto table-fixed w-full overflow-hidden border border-gray-500/20 mt-10">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
              <tr>
                <th className="p-3 font-semibold truncate">Course</th>
                <th className="p-3 font-semibold truncate">Duration</th>
                <th className="p-3 font-semibold truncate">Completed</th>
                <th className="p-3 font-semibold truncate">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {enrolledCourses.map((course, index) => (
                <tr
                  key={course._id}
                  className="border-b border-gray-500/20 text-sm text-left"
                >
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-14 sm:w-24 md:w-28"
                    />
                    <div className="flex-1">
                      <p className="mb-1 max-sm:text-sm font-medium">
                        {course.courseTitle}
                      </p>
                      <Line
                        percent={
                          (progressArray[index].lectureCompleted /
                            progressArray[index].totalLectures) *
                          100
                        }
                        strokeWidth={2}
                        strokeColor="#3b82f6"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {progressArray[index] &&
                      `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}{" "}
                    <span>Lectures</span>
                  </td>
                  <td className="px-4 py-3 max-sm:text-right">
                    {progressArray[index].lectureCompleted ===
                    progressArray[index].totalLectures ? (
                      <button
                        className="px-3 sm:px-5 py-1.5 sm:py-2 bg-green-700 max-sm:text-xs text-white cursor-pointer rounded"
                        onClick={() => navigate(`/player/${course._id}`)}
                      >
                        Completed
                      </button>
                    ) : (
                      <button
                        className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white cursor-pointer rounded"
                        onClick={() => navigate(`/player/${course._id}`)}
                      >
                        On Going
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyEnrollments;
