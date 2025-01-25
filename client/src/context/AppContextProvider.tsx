import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { ICourseContent, ICuorse, ITestimonialData } from "./types";
import { dummyCourses, dummyTestimonial } from "../assets/assets";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const { input } = useParams();

  const [allCourses, setAllCourses] = useState<ICuorse[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonialData[]>([]);
  const [isEducator, setIsEducator] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>(input ? input : "");
  const [tempQuery, setTempQuery] = useState<string>("");

  const fetchAllCourses = async (): Promise<void> => {
    setAllCourses(dummyCourses as ICuorse[]);
  };

  const fetchTestimonials = async (): Promise<void> => {
    setTestimonials(dummyTestimonial as ITestimonialData[]);
  };

  const calculateRating = (course: ICuorse) => {
    if (course.courseRatings?.length === 0) {
      return 0 as number;
    }

    let totalRating = 0;
    course.courseRatings?.forEach((rating) => {
      totalRating += rating.rating || 0;
    });
    const averageRating = totalRating / (course.courseRatings?.length || 1);
    return Number(averageRating.toFixed(1));
  };

  const calculateChapterTime = (chapter : ICourseContent) => {
    let time = 0;

    chapter.chapterContent?.forEach((content) => {
      time += content.lectureDuration || 0;
    })

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  }

  const calculateCourseDuration = (course : ICuorse) => {
    let time = 0;

    course.courseContent?.forEach((chapter) => {
      chapter.chapterContent?.forEach((content) => {
        time += content.lectureDuration || 0;
      })
    })

    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  }

  const totalLecturesInCourse = (course : ICuorse) => {
    let lectures = 0;

    course.courseContent?.forEach((chapter) => {
      lectures += chapter.chapterContent?.length || 0;
    })

    return lectures;
  }

  useEffect(() => {
    fetchAllCourses();
    fetchTestimonials();
  }, []);

  const value = {
    currency,
    allCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    testimonials,
    searchQuery,
    setSearchQuery,
    tempQuery,
    setTempQuery,
    calculateChapterTime,
    calculateCourseDuration,
    totalLecturesInCourse
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
