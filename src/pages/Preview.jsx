import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MediaPreview from "../components/MediaPreview";
import ReviewPreview from "../components/ReviewPreview";
import BtnAction from "../components/BtnAction";
import Back from "../assets/writeIcon/Back.svg?react";
import "./Write.css";

const Preview = ({ reviewData, setReviewData }) => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!reviewData || reviewData.length === 0) return;

    const foundReview = reviewData.find((item) => item.id === Number(id));

    if (foundReview) {
      setReview(foundReview);
    } else {
      setError("Review not found");
    }

    setLoading(false);
  }, [id, reviewData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!review) return <div>Review not found</div>;

  return (
    console.log("Preview review:", review),
    (
      <div>
        <div className="write-page">
          <div className="write-container">
            {/* LEFT */}
            <div className="write-left">
              <Back
                className="back-button"
                width="22"
                height="22"
                onClick={() => nav(-1)}
              />
              <MediaPreview review={review} />
            </div>

            {/* RIGHT */}
            <div className="write-right">
              <ReviewPreview review={review} />
              <BtnAction
                reviewData={reviewData}
                setReviewData={setReviewData}
                id={id}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Preview;
