import { useNavigate } from "react-router-dom";

import "./TagPopup.css";

const TagPopup = ({ tag, reviews, onClose }) => {
    const navigate = useNavigate();

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>

                <button className="popup-close" onClick={onClose}>✕</button>
                <h2>#{tag}</h2>

                <div className="popup-list">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="popup-item"
                            onClick={() => navigate(`/review/${review.id}`)}
                        >
                            <img
                                src={review.media_info.thumbnail}
                                alt={review.media_info.title}
                            />
                            <p className="popup-title">{review.media_info.title}</p>
                            <span className="popup-genre">{review.media_info.genre}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TagPopup;