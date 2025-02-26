import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";

const SearchBar: React.FC = () => {
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery, tempQuery, setTempQuery } =
    useAppContext();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/course-list/${searchQuery}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-lg w-full md:h-12 h-10 flex items-center bg-white border border-gray-500/30 rounded"
    >
      <div className="md:px-3 px-2 text-gray-600 text-2xl">
        <IoIosSearch />
      </div>
      <input
        type="text"
        placeholder="Search for courses"
        className="outline-none w-full h-full text-gray-600/90"
        value={tempQuery || searchQuery}
        onChange={(e) => setTempQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded md:px-10 px-7 md:py-2 py-1 mx-1 cursor-pointer"
        onClick={() => setSearchQuery(tempQuery)}
        disabled={!tempQuery && !searchQuery}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
