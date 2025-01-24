import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type Props = {
  data?: string;
};

const SearchBar: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  const [input, setInput] = React.useState<string>(data ? data : "");
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/course-list/${input}`);
  }

  return (
    <form onSubmit={handleSearch} className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/30 rounded">
      <div className="md:px-3 px-2 text-gray-600 text-2xl">
        <IoIosSearch />
      </div>
      <input
        type="text"
        placeholder="Search for courses"
        className="outline-none w-full h-full text-gray-600/90"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded md:px-10 px-7 md:py-3 py-2 mx-1"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
