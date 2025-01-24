import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { dummyTestimonial } from "../assets/assets";

interface IChapterContent {
  lectureId: string;
  lectureTitle: string;
  lectureDuraton?: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
}

interface ICourseContent {
  chapterId?: string;
  chapterOrder?: number;
  chapterTitle?: string;
  chapterContent?: IChapterContent[];
}

export interface ICuorse {
  _id: string;
  courseTitle: string;
  courseDescription?: string;
  coursePrice: number;
  isPublished?: boolean;
  discount?: number;
  courseThumbnail?: string;
  educator: {
    name: string;
  };
  courseContent?: ICourseContent[];
  courseRatings?: {
    userId?: string;
    rating?: number;
    _id?: string;
  }[];
}

interface ITestimonialData {
    name: string;
    role: string;
    image: string;
    rating: number;
    feedback: string;
}

interface AppContextType {
  currency: string;
  allCourses: ICuorse[];
  calculateRating: (course: ICuorse) => number;
  isEducator: boolean;
  setIsEducator: (value: boolean) => void;
  testimonials: ITestimonialData[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allCourses, setAllCourses] = useState<ICuorse[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonialData[]>([]);
  const [isEducator, setIsEducator] = useState<boolean>(true);

  const fetchAllCourses = async (): Promise<void> => {
    setAllCourses(dummyCourses as ICuorse[]);
  };

  const fetchTestimonials = async (): Promise<void> => {
    setTestimonials(dummyTestimonial as ITestimonialData[]);
  }

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
    testimonials
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
