import { useNavigate } from "react-router-dom";
import style from "./SearchBar.module.css";

const SearchBar = function ({
  bgInputColor,
  color,
  searchTerm,
  setSearchTerm,
  userType,
}) {
  const navigate = useNavigate();
  const customInputStyle = {
    backgroundColor: bgInputColor || "",
    color: color || "",
  };

  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!searchTerm) {
      alert("Please enter a valid query!");
      return;
    }
    const urlString =
      userType === "admin" ? `/admin/${searchTerm}` : `/${searchTerm}`;
    navigate(urlString);
    return;
  }

  return (
    <div className={style["searchbar"]}>
      <form onSubmit={handleSubmit} className={style["search-form"]}>
        <input
          style={customInputStyle}
          type="search"
          name="tutorial"
          id="tutorial"
          placeholder="Search..."
          autoComplete="off"
          onChange={handleInputChange} // Capture input value
        />
        <button type="submit" onSubmit={(e) => e.preventDefault()}>
          <img src="Images/search.png" alt="searchicon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
