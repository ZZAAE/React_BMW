import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import ShelfSVG from "../assets/shelves.svg?react";
import "./ReviewList.css";

const BOOK_WIDTH = 150;
const BOOK_GAP = 36;

const ReviewList = ({ data, className }) => {
    const navigate = useNavigate();
    const centerIndex = Math.floor(data.length / 2);
    const containerRef = useRef(null);
    const [chunkSize, setChunkSize] = useState(6);

    useEffect(() => {
        if (className !== "grid-layout") return;

        const observer = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width - 60; // 좌우 30px씩 제외
            let n = Math.floor((width + BOOK_GAP) / (BOOK_WIDTH + BOOK_GAP));

            while (n * BOOK_WIDTH + (n - 1) * BOOK_GAP > width && n > 1) {
                n--;
            }

            setChunkSize(Math.max(1, n));
        });

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [className]);

    const shelves = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        shelves.push(data.slice(i, i + chunkSize));
    }

    if (className === "grid-layout") {
        return (
            <div className={className} ref={containerRef}>
                {shelves.map((shelf, shelfIndex) => (
                    <div className="shelf-row" key={shelfIndex}>
                        <div className="shelf-books">
                            {shelf.map((item) => (
                                <button
                                    key={item.id}
                                    className="review-list-item"
                                    onClick={() => navigate(`/review/${item.id}`)}>
                                    <img src={item.media_info.thumbnail} alt={item.media_info.title} draggable="false" />
                                </button>
                            ))}
                        </div>
                        <ShelfSVG className="shelf-svg" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={className}>
            {data.map((item, index) => (
                <button
                    key={item.id}
                    className={`review-list-item ${className === "scroll-layout" && index === centerIndex ? "featured" : ""}`}
                    onClick={() => navigate(`/review/${item.id}`)}>
                    <img src={item.media_info.thumbnail} alt={item.media_info.title} draggable="false" />
                    {className === "scroll-layout" && (
                        <>
                            <h3>{item.media_info.title}</h3>
                            <span>{item.media_info.creator}</span>
                        </>
                    )}
                </button>
            ))}
        </div>
    );
};

export default ReviewList;