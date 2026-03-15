import "./ReviewForm.css";

const ReviewPreview = ({ review }) => {
    return (
        <div className="review-section">
            <div className="rating-stars">
                {[1,2,3,4,5].map((star) => (
                    <div key={star} className="star-wrapper">
                        {/* 왼쪽 반 별 */}
                        <span
                            className={
                                review.rating >= star - 0.5 ? "star filled half" : "star half"
                            }
                        >
                            ★
                        </span>

                        {/* 오른쪽 반 별 */}
                        <span
                            className={
                                review.rating >= star ? "star filled" : "star"
                            }
                        >
                            ★
                        </span>
                    </div>
                ))}
            </div>

            {/* 리뷰 표시 */}
            <div className="review-display">
                {review.review}
            </div>
        </div>
    );
};

export default ReviewPreview;