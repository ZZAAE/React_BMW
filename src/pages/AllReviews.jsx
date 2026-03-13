import { useState } from "react";
import { ReviewList } from "../components/ReviewList";

const AllReviews = () => {
    const [type, setType] = useState("all")

    const setOrderType = (e) => {
        setType(e.target.value);
    }

    return (
        <div>
            <h1>ALL REVIEWS</h1>
            <button onClick={() => setOrderType("all")}>전체</button>
            <button onClick={() => setOrderType("movie")}>영화</button>
            <button onClick={() => setOrderType("book")}>도서</button>

            <ReviewList type={type} />
        </div>
    );
}; export default AllReviews;