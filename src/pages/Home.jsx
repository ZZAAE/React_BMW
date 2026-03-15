import { useState } from "react";
import ReviewFilter from "../components/ReviewFilter";
import ReviewList from "../components/ReviewList";
import WeeklyCarousel from "../components/WeeklyCarousel";

import { dummyReviews } from "../hooks/dummyReviews";
import getWeeklyRange from "../util/getWeeklyRange";

import "./Home.css";

const Home = () => {
    const [filterType, setFilterType] = useState("all");

    const { monday, sunday } = getWeeklyRange();
    const weeklyData = dummyReviews.filter((item) => {
        const updatedAt = new Date(item.updated_at);
        return updatedAt >= monday && updatedAt <= sunday;
    });

    const filteredData = dummyReviews.filter((item) =>
        filterType === "all" ? true : item.media_type === filterType);

    return (
        <div className="home-container">
            <WeeklyCarousel data={weeklyData} />

            <div className="all-container">
                <div className="all-reviews-container">
                    <h2>ALL REVIEWS</h2>
                    <ReviewFilter onFilter={setFilterType} />
                </div>

                <div className="home-list">
                    <ReviewList data={filteredData} className="grid-layout" />
                </div>
            </div>
        </div>
    );
};

export default Home;