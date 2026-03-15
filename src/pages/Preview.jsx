import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MediaPreview from "../components/MediaPreview";
import ReviewPreview from "../components/ReviewPreview";
import BtnAction from "../components/BtnAction";

const Preview = ({reviewData ,setReviewData}) => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/reviews/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Review not found");
        return res.json();
      })
      .then((data) => {
        setReview(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!review) return <div>Review not found</div>;

  return (
    <div>
      <div className="write-page">
        <div className="write-container">
          {/* LEFT */}
          <div className="write-left">
            <MediaPreview review={review} />
          </div>

          {/* RIGHT */}
          <div className="write-right">
            <ReviewPreview review={review}/>
            <BtnAction reviewData={reviewData} setReviewData={setReviewData} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;