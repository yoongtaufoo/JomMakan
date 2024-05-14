import React from "react";
import { useState } from "react";
import "./SearchBar.css";
import searchIcon from "../assets/search.png";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the search query to the parent component
    props.onSearch(query);
  };
  console.log(query)

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        className="search-term"
        style={{ backgroundColor: "" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        placeholder={props.place}
      />
      <button type="submit" className="searchButton">
        <i className="bi bi-search" id="search-icon"></i>
      </button>
    </form>
  );
};

export default SearchBar;
