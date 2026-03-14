import "./ReviewForm.css";

const ReviewForm = ({ rating, review, onChangeRating, onChangeReview, handleCreate }) => {

    const handleRating = (value) => {
        onChangeRating(value);
    };

    return (
        <div className="review-section">

            <div className="rating-stars">

                {[1,2,3,4,5].map((star) => (

                    <div key={star} className="star-wrapper">

                        {/* 왼쪽 반 별 */}
                        <span
                            className={
                                rating >= star - 0.5 ? "star filled half" : "star half"
                            }
                            onClick={() => handleRating(star - 0.5)}
                        >
                            ★
                        </span>

                        {/* 오른쪽 반 별 */}
                        <span
                            className={
                                rating >= star ? "star filled" : "star"
                            }
                            onClick={() => handleRating(star)}
                        >
                            ★
                        </span>

                    </div>

                ))}

            </div>

            {/* 리뷰 입력 */}
            <textarea
                value={review}
                onChange={onChangeReview}
                className="review-input"
                placeholder="감상을 입력하세요"
            />

            {/* 작성 버튼 */}
            <button
                className="submit-btn"
                onClick={handleCreate}
            >
                작성
            </button>

        </div>
    );
};

export default ReviewForm;