import { useState } from "react";
import { ReviewList } from "../components/ReviewList";
import { dummyReviews } from "../hooks/dummyReviews";

const AllReviews = () => {
    const [sortedData, setSortedData] = useState(dummyReviews);

    const setOrderType = (value) => {
        setSortedData(value === "all" ? dummyReviews : dummyReviews.filter((item) => item.media_type === value) )
    }

    return (
        <div>
            <h1>ALL REVIEWS</h1>
            <button onClick={() => setOrderType("all")}>전체</button>
            <button onClick={() => setOrderType("movie")}>영화</button>
            <button onClick={() => setOrderType("book")}>도서</button>

            <ReviewList data={sortedData} />
        </div>
    );
}; export default AllReviews;