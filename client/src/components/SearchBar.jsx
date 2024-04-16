import React from "react";
import { useState } from "react";
import "./SearchBar.css";
import searchIcon from "../assets/search.png";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-bar">
      <input
        className="search-term"
        style={{ backgroundColor: "" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        placeholder={props.place}
      />
      <button type="submit" className="searchButton">
        <i class="bi bi-search" id="search-icon"></i>
      </button>
    </div>
  );
};

export default SearchBar;
