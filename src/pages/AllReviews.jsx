import { useState } from "react";
import ReviewList from "../components/ReviewList";
import ReviewFilter from "../components/ReviewFilter";
import ReviewOrder from "../components/ReviewOrder";
import { dummyReviews } from "../hooks/dummyReviews";
import useReviewList from "../util/useReviewList";

const AllReviews = () => {
    const [filterType, setFilterType] = useState("all");
    const [orderType, setOrderType] = useState("latest");

    const filteredData = filterType === "all"
        ? dummyReviews
        : dummyReviews.filter((item) => item.media_type === filterType);

    const sortedData = useReviewList(filteredData, orderType);

    return (
        <div>
            <h1>ALL REVIEWS</h1>
            <ReviewFilter onFilter={setFilterType} />
            <ReviewOrder onOrder={setOrderType} orderType={orderType} />
            <ReviewList data={sortedData} className="grid-layout" />
        </div>
    );
};

export default AllReviews;