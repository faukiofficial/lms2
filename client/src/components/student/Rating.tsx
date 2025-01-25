import React, { useEffect } from "react";

type Props = {
  initialRating?: number;
  onRate?: (starValue: number) => void;
};

const Rating : React.FC<Props> = ({ initialRating, onRate}) => {
  const [rating, setRating] = React.useState<number>(initialRating || 0);

  const handleRating = (starValue: number) => {
    setRating(starValue);
    if (onRate) {
      onRate(starValue);
    }
  }

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating])

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;

        return (
          <span key={index} className={`text-xl sm:text-2xl cursor-pointer transition-colors ${starValue <= rating ? "text-yellow-400" : "text-gray-400"}`}>
            <span onClick={() => handleRating(starValue)}>&#9733;</span>
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
