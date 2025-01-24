
export interface IChapterContent {
  lectureId: string;
  lectureTitle: string;
  lectureDuraton?: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
}

export interface ICourseContent {
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
  enrolledStudents?: string[];
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

export interface ITestimonialData {
    name: string;
    role: string;
    image: string;
    rating: number;
    feedback: string;
}

export interface AppContextType {
  currency: string;
  allCourses: ICuorse[];
  calculateRating: (course: ICuorse) => number;
  isEducator: boolean;
  setIsEducator: (value: boolean) => void;
  testimonials: ITestimonialData[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  tempQuery: string;
  setTempQuery: (value: string) => void;
}