import { useRef, useState } from "react";
import ReviewFilter from "../components/ReviewFilter";
import ReviewList from "../components/ReviewList";

import { useNavigate } from "react-router-dom";
import { dummyReviews } from "../hooks/dummyReviews";
import getWeeklyRange from "../util/getWeeklyRange";

import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const [filterType, setFilterType] = useState("all");
    const dragStartX = useRef(0);
    const isDragging = useRef(false);

    // Filtered Data
    const { monday, sunday } = getWeeklyRange();
    const weeklyData = dummyReviews.filter((item) => {
        const updatedAt = new Date(item.updated_at);
        return updatedAt >= monday && updatedAt <= sunday;
    });

    const centerIndex = Math.floor(weeklyData.length / 2);
    const [currentIndex, setCurrentIndex] = useState(centerIndex);

    // const [sortedData, setSortedData] = useState(dummyReviews);
    // const setOrderType = (value) => {
    //     setSortedData(value === "all" ? dummyReviews : dummyReviews.filter((item) => item.media_type === value));
    // }; --> filterType이 바뀌면 따라서 바뀌는 데이터임으로 useState를 쓸 필요 X
    const filteredData = dummyReviews.filter((item) =>
        filterType === "all" ? true : item.media_type === filterType);

    const handleDragStart = (e) => {
        dragStartX.current = e.clientX || e.touches?.[0]?.clientX;
        isDragging.current = true;
    };

    const handleDragEnd = () => {
        isDragging.current = false;
    };

    const handleDragMove = (e) => {
        if (!isDragging.current) return;
        const currentX = e.clientX || e.touches?.[0]?.clientX;
        const diff = dragStartX.current - currentX;

        if (diff > 200 && currentIndex < weeklyData.length - 1) {  // 속도: 200
            setCurrentIndex(prev => prev + 1);
            dragStartX.current = currentX;
        } else if (diff < -200 && currentIndex > 0) {  // 속도: -200
            setCurrentIndex(prev => prev - 1);
            dragStartX.current = currentX;
        }
    };

    return (
        <div className="home-container">
            <div className="this-week-section" onMouseLeave={handleDragEnd}>
                <h2>THIS WEEK</h2>
                <div className="carousel"
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd} >
                    <div className="carousel-track"
                        style={{ transform: `translateX(calc(-${currentIndex * 166}px + calc(50% - 112px)))` }} >
                        {weeklyData.map((item, index) => {
                            const distance = Math.abs(index - currentIndex);
                            const isFeatured = index === currentIndex;

                            return (
                                <button
                                    key={item.id}
                                    className={`carousel-item ${isFeatured ? "featured" : ""}`}
                                    style={{
                                        opacity: 1 - distance * 0.15,
                                        transform: isFeatured ? "scale(1)" : `scale(${1 - distance * 0.1})`
                                    }}
                                    onClick={(e) => {
                                        if (Math.abs(dragStartX.current - e.clientX) > 10) return;
                                        if (isFeatured) navigate(`/review/${item.id}`);
                                        else setCurrentIndex(index);
                                    }}
                                >
                                    <img src={item.media_info.thumbnail} alt={item.media_info.title} />

                                    <h3>{item.media_info.title}</h3>

                                    {isFeatured && (
                                        <div className="carousel-tags">
                                            {item.tag.slice(0, 2).map((tag, i) => (
                                                <span key={i}>#{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </button>
                            );
                        })}</div>
                </div>
            </div>

            <div>
                <h2>ALL REVIEWS</h2>
                <ReviewFilter onFilter={setFilterType} />
                <ReviewList data={filteredData} className="grid-layout" />
            </div>
        </div >
    );
};

export default Home;