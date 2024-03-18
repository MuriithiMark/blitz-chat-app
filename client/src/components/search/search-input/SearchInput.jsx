import React from "react";
import { useState } from "react";

import "./search-input.scss";
import SearchFilters from "../search-filters/SearchFilters";

const SearchInput = ({ className, placeholder }) => {
  const [searchText, setSearchText] = useState("");
  const handleChange = async (event) => setSearchText(event.target.value);
  return (
    <div className={`search-input-container ${className}`}>
      <input
        type="search"
        className="search-input"
        placeholder={placeholder}
        value={searchText}
        onChange={handleChange}
      />
      <SearchFilters />
    </div>
  );
};

export default SearchInput;
