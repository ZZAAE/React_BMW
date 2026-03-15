import "./ReviewForm.css";
import Profile from "../assets/writeIcon/Profile.svg?react";
import Star from "../assets/writeIcon/Star.svg?react";
import Bubble from "../assets/writeIcon/Bubble.svg?react";

const ReviewPreview = ({ review }) => {
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
                    review.rating >= star - 0.5
                      ? "star filled half"
                      : "star half"
                  }
                >
                  <Star />
                </span>

                {/* 오른쪽 반 별 */}
                <span
                  className={review.rating >= star ? "star filled" : "star"}
                >
                  <Star />
                </span>
              </div>
            ))}
          </div>
        </div>
        <Profile className="profile-img" />
      </div>

      {/* 리뷰 표시 */}
      <div className="preview-display">{review.review}</div>
    </div>
  );
};

export default ReviewPreview;
