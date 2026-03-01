import "./SearchField.scss";
import searchIcon from "../../assets/icons/search.svg";

function SearchField({ value, onChange, placeholder = "Search...", variant = "dark" }) {
  return (
    <div className={`search ${variant === "light" ? "search--light" : ""}`}>
      <img className="search__icon" src={searchIcon} alt="" />
      <input
        className="search__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}

export default SearchField;