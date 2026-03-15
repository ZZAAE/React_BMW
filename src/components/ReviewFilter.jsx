import "./ReviewFilter.css";
import { useState } from "react";

const ReviewFilter = ({ onFilter }) => {

    const [filter, setFilter] = useState("all");

    const handleFilterChange = (type) => {
        setFilter(type);
        onFilter(type);
    };

  return (
    <div className="review-filter">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => handleFilterChange("all")}
      >
        전체
      </button>

      <button
        className={filter === "movie" ? "active" : ""}
        onClick={() => handleFilterChange("movie")}
      >
        영화
      </button>

      <button
        className={filter === "book" ? "active" : ""}
        onClick={() => handleFilterChange("book")}
      >
        도서
      </button>
    </div>
  );
};

export default ReviewFilter;
