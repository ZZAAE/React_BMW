const ReviewFilter = ({ onFilter }) => {
    return (
        <div>
            <button onClick={() => onFilter("all")}>전체</button>
            <button onClick={() => onFilter("movie")}>영화</button>
            <button onClick={() => onFilter("book")}>도서</button>
        </div>
    );
};

export default ReviewFilter;