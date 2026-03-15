import "./ReviewForm.css";
import Profile from "../assets/writeIcon/Profile.svg?react";
import Star from "../assets/writeIcon/Star.svg?react";
import Bubble from "../assets/writeIcon/Bubble.svg?react";

const ReviewForm = ({
  rating,
  review,
  onChangeRating,
  onChangeReview,
  handleCreate,
}) => {
  const handleRating = (value) => {
    onChangeRating(value);
  };

  return (
    <div className="review-section">
      <div className="review-header">
        <div className="bubble-wrapper">
          <Bubble />
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="star-wrapper">
                {/* 왼쪽 반 별 */}
                <span
                  className={
                    rating >= star - 0.5 ? "star filled half" : "star half"
                  }
                  onClick={() => handleRating(star - 0.5)}
                >
                  <Star />
                </span>

                {/* 오른쪽 반 별 */}
                <span
                  className={rating >= star ? "star filled" : "star"}
                  onClick={() => handleRating(star)}
                >
                  <Star />
                </span>
              </div>
            ))}
          </div>
        </div>
        <Profile className="profile-img" />
      </div>

      {/* 리뷰 입력 */}
      <textarea
        name="review"
        value={review}
        onChange={onChangeReview}
        className="review-input"
        placeholder="감상을 입력하세요"
      />

      {/* 완료 버튼 */}
      <button className="submit-btn" onClick={handleCreate}>
        완료
      </button>
    </div>
  );
};

export default ReviewForm;
