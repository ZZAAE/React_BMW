import "./ReviewForm.css";
import Profile from "../assets/writeIcon/Profile.svg?react";
import Star from "../assets/writeIcon/Star.svg?react";
import Bubble from "../assets/writeIcon/Bubble.svg?react";
import DoubleQuotes from "../assets/writeIcon/Double_quotes.svg?react";

const ReviewForm = ({
  rating,
  review,
  onChangeRating,
  onChangeReview,
  handleCreate,
  reviewInfo,
}) => {

  const handleRating = (value) => {
    if (!reviewInfo) return;
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
                  style={{ cursor: reviewInfo ? "pointer" : "default" }}
                >
                  <Star />
                </span>

                {/* 오른쪽 반 별 */}
                <span
                  className={rating >= star ? "star filled" : "star"}
                  onClick={() => handleRating(star)}
                  style={{ cursor: reviewInfo ? "pointer" : "default" }}
                >
                  <Star />
                </span>

              </div>
            ))}
          </div>

        </div>

        <Profile className="profile-img" />
      </div>

      <div className="review-input-wrapper">
        <div className="review-input-header">
          <DoubleQuotes className="double-quotes-icon" />
          <div className="review-input-line" />
        </div>
        {/* 리뷰 입력 */}
        <textarea
          name="review"
          value={review}
          onChange={onChangeReview}
          className="review-input"
          disabled={!reviewInfo}
          placeholder={
            reviewInfo
              ? "감상을 입력하세요"
              : "작품을 선택해주세요."
          }
        />
      </div>


      {/* 완료 버튼 */}
      <button
        className="submit-btn"
        onClick={handleCreate}
        disabled={!reviewInfo || !review.trim()}
      >
        완료
      </button>

    </div>
  );
};

export default ReviewForm;