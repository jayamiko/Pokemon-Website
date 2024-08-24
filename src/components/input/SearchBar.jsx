import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import PokeballIcon from "../../assets/pokeball-icon.png";

function SearchBar({ query, setQuery, placeHolder, onSearch }) {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    inputRef.current.focus();
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="items-center justify-between w-full md:w-1/2 p-2 rounded-3xl shadow-md bg-white focus-within:ring-2 focus-within:ring-yellowTheme focus-within:outline-none">
      <div className=" flex items-center justify-between w-full px-2">
        <img
          src={PokeballIcon}
          alt="PokeDex Logo"
          className="w-9 h-9"
          onClick={handleIconClick}
          draggable="false"
        />
        <input
          type="text"
          className="mx-2 w-full outline-none bg-white text-purpleTheme"
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={placeHolder}
        />
        <FaSearch color="#0369a1" size={24} onClick={handleSearch} />
      </div>
    </div>
  );
}

export default SearchBar;
