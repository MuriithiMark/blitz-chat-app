import React from "react";

import "./search-filters.scss";
import { useState } from "react";

const filters = [
  { id: 1, name: "all" },
  { id: 2, name: "people" },
  { id: 3, name: "posts" },
];

const SearchFilters = ({ className, onFilterSelect }) => {
  const [currentFilter, setCurrentFilter] = useState({ id: 1, name: "all" });
  const handleFilterClick = (filter) => {
    setCurrentFilter(filter);
    if(!onFilterSelect) {
        return;
    }
    onFilterSelect(filter)
  };

  return (
    <div className={`search-filters-container ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter)}
          className={`pin-btn ${
            currentFilter.id === filter.id && "active-pin"
          }`}
        >
          <span className="pin-content">{filter.name}</span>
        </button>
      ))}
    </div>
  );
};

export default SearchFilters;
