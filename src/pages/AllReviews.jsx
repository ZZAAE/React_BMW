import { useState } from "react";
import { ReviewList } from "../components/ReviewList";
import { dummyReviews } from "../hooks/dummyReviews";

const AllReviews = () => {
    const [type, setType] = useState("all")
    const [sortedData, setSortedData] = useState(dummyReviews);

    const setOrderType = (value) => {
        setType(value);

        if (type === "all") {
            setSortedData(dummyReviews)
        }
        else if (type === "movie") {
            setSortedData(dummyReviews.filter((item) => item.media_type === type))
        }
        else if (type === "book") {
            setSortedData(dummyReviews.filter((item) => item.media_type === type))
        }
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