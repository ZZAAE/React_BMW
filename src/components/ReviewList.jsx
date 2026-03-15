import { useNavigate } from "react-router-dom";
import "./ReviewList.css";

const ReviewList = ({ data, className }) => {
    const navigate = useNavigate();
    const centerIndex = Math.floor(data.length / 2); // css

    return (
        <div className={className}>
            {data.map((item, index) => (
                 <button
                    key={item.id}
                    className={`review-list-item ${className === "scroll-layout" && index === centerIndex ? "featured" : ""}`}
                    onClick={() => navigate(`/review/${item.id}`)} >
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
}; export default ReviewList;