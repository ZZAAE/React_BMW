import { useState } from "react";
import ReviewList from "../components/ReviewList";
import ReviewFilter from "../components/ReviewFilter";
import ReviewOrder from "../components/ReviewOrder";
import useReviewList from "../util/useReviewList";
import "./AllReviews.css";

const AllReviews = ({ reviewData }) => {
    const [filterType, setFilterType] = useState("all");
    const [orderType, setOrderType] = useState("latest");

    const filteredData = filterType === "all"
        ? reviewData
        : reviewData.filter((item) => item.media_type === filterType);

    const sortedData = useReviewList(filteredData, orderType);

    console.log("sortedData", sortedData);

    return (
        <div className="allreviews-container">
            <div className="allreviews-header">
                <h1>ALL REVIEWS</h1>
                <div className="allreviews-controls">
                    <ReviewFilter onFilter={setFilterType}/>
                    <ReviewOrder onOrder={setOrderType} orderType={orderType} />
                </div>
            </div>
            <div className="allreviews-list">
                <ReviewList data={sortedData} className="grid-layout" />
            </div>
        </div>
    );
};

export default AllReviews;