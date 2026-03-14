import { useState } from "react";
import ReviewFilter from "../components/ReviewFilter";
import ReviewList from "../components/ReviewList";

import { dummyReviews } from "../hooks/dummyReviews";
import getWeeklyRange from "../util/getWeeklyRange";

const Home = () => {
    const [filterType, setFilterType] = useState("all")

    // Filtered Data
    const { monday, sunday } = getWeeklyRange();
    const weeklyData = dummyReviews.filter((item) => {
        const updatedAt = new Date(item.updated_at);
        return updatedAt >= monday && updatedAt <= sunday;
    });

    // const [sortedData, setSortedData] = useState(dummyReviews);
    // const setOrderType = (value) => {
    //     setSortedData(value === "all" ? dummyReviews : dummyReviews.filter((item) => item.media_type === value));
    // }; --> filterType이 바뀌면 따라서 바뀌는 데이터임으로 useState를 쓸 필요 X
    const filteredData = dummyReviews.filter((item) =>
        filterType === "all" ? true : item.media_type === filterType);

    return (
        <>
            <div>
                <h2>THIS WEEK</h2>
                <ReviewList data={weeklyData} className="scroll-layout" />
            </div>

            <div>
                <h2>ALL REVIEWS</h2>
                <ReviewFilter onFilter={setFilterType} />
                <ReviewList data={filteredData} className="grid-layout" />
            </div>
        </>
    );
}; export default Home;
