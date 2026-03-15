import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WeeklyCarousel.css";

const WeeklyCarousel = ({ data }) => {
    const navigate = useNavigate();
    const centerIndex = Math.floor(data.length / 2);
    const [currentIndex, setCurrentIndex] = useState(centerIndex);
    const dragStartX = useRef(0);
    const isDragging = useRef(false);

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

        if (diff > 200 && currentIndex < data.length - 1) {
            setCurrentIndex(prev => prev + 1);
            dragStartX.current = currentX;
        } else if (diff < -200 && currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            dragStartX.current = currentX;
        }
    };

    // const translateX = -(currentIndex * cardStep) + (50 - currentCardWidth / 2);

    return (
        <div className="this-week-section" onMouseLeave={handleDragEnd}>
            <h2>THIS WEEK</h2>
            <div className="carousel-wrapper">
                <div className="carousel-btn left" onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))} />

                <div className="carousel"
                    onMouseDown={handleDragStart} onTouchStart={handleDragStart}
                    onMouseMove={handleDragMove} onTouchMove={handleDragMove}
                    onMouseUp={handleDragEnd} onTouchEnd={handleDragEnd}>
                    <div className="carousel-track"
                        style={{ transform: `translateX(calc(-${currentIndex * 190}px + calc(50% - 100px)))` }}>
                        {data.map((item, index) => {
                            const distance = Math.abs(index - currentIndex);
                            const isFeatured = index === currentIndex;

                            return (
                                <button key={item.id}
                                    className={`carousel-item ${isFeatured ? "featured" : ""}`}
                                    style={{ opacity: 1 - distance * 0.15, }}
                                    onClick={(e) => {
                                        if (Math.abs(dragStartX.current - e.clientX) > 10) return;
                                        if (isFeatured) navigate(`/review/${item.id}`);
                                        else setCurrentIndex(index);
                                    }}>
                                    <img src={item.media_info.thumbnail} alt={item.media_info.title} draggable="false" />
                                    <h3>{item.media_info.title}</h3>
                                    <div className="carousel-tags">
                                        {item.tag.slice(0, 2).map((tag, i) => (
                                            <span key={i}>#{tag}</span>
                                        ))}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="carousel-btn right" onClick={() => setCurrentIndex(prev => Math.min(prev + 1, data.length - 1))} />
            </div>
        </div>
    );
};

export default WeeklyCarousel;