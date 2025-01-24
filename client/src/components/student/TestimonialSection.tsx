import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { useAppContext } from "../../context/useAppContext";

const TestimonialSection : React.FC = () => {
  const { testimonials } = useAppContext();
  return (
    <div className="py-16 md:px-30 px-8">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="text-sm md:text-base text-gray-600 mt-3">
        Hear from our learners as they share their journeys of transformation,
        success, and how our
        <br /> platform has made a difference in their lives.
      </p>
      <div className="grid sm:grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="text-left text-sm border border-gray-500/30 rounded shadow-[0px_4px_15px_0px] shadow-gray-200 overflow-hidden">
            <div className="flex flex-col items-center">
              <div className="flex items-start gap-3  bg-gray-500/10 w-full p-3">
              <img className="h-12 w-12 rounded-full object-cover" src={testimonial.image} alt={testimonial.name} />
              <div>
                <h1 className="text-lg font-medium text-gray-800">{testimonial.name}</h1>
                <p className="text-gray-800/80">{testimonial.role}</p>
              </div>
              </div>
              <div className="flex flex-col gap-2 p-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => {
                    const rating = Number(testimonial.rating.toFixed(1));
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
                <p>{testimonial.feedback}</p>

                <a href="#" className="text-blue-500 underline font-medium">Read More</a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
