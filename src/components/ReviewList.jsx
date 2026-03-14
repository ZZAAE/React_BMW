import { useNavigate } from "react-router-dom";
import "./ReviewList.css";

const ReviewList = ({ data, className }) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            {data.map((item) => (
                <button key={item.id} className="review-list-item" onClick={() => navigate(`/review/${item.id}`)}>
                    <img src={item.media_info.thumbnail} alt={item.media_info.title} />
                    <h3>{item.media_info.title}</h3>
                    <span>{item.media_info.creator}</span>
                </button>
            ))}
        </div>
    );
}; export default ReviewList;