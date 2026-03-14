import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MediaSelection from "../components/MediaSelection";
import ReviewForm from "../components/ReviewForm";
import "./Write.css";

const Write = ({ reviewData, setReviewData, reviewInfo, setReviewInfo }) => {


    const nav = useNavigate();
    const ReviewId = useRef(reviewData.length);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    // console.log(reviewInfo);
    

    const selectTag = (review) => {

        const matches = review.match(/#([^\s#]+)/g) || [];

        return [...new Set(
            matches.map(tag => tag.replace("#", ""))
        )];

    };

    const addRating = (e) => {
        setRating(e);
        console.log("rating:", e);
    };

    const addReview = (e) => {
        setReview(e.target.value);
    };

    const handleCreate = () => {

        if (!reviewInfo) return;

        if (!review.trim()) return;

        ReviewId.current += 1;

        const tags = selectTag(review);

        const addNewData = {
            id: ReviewId.current,
            media_type: reviewInfo.media_type,
            rating: rating,
            review: review,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            tag: tags,
            media_info: {
                title: reviewInfo.title,
                creator: reviewInfo.creator,
                thumbnail: reviewInfo.thumbnail,
                genre: reviewInfo.genre,
            }
        };

        setReviewData(prev => [...prev, addNewData]);

        nav("/", { replace: true });
    };


    return (
        <div className="write-page">

            <div className="write-container">

                {/* LEFT */}
                <div className="write-left">
                    <MediaSelection
                        reviewInfo={reviewInfo}
                        setReviewInfo={setReviewInfo}
                    />

                    <div className="add-button">+</div>
                </div>

                {/* RIGHT */}
                <div className="write-right">
                    <ReviewForm
                        rating={rating}
                        review={review}
                        onChangeRating={addRating}
                        onChangeReview={addReview}
                        handleCreate={handleCreate}
                    />
                </div>

            </div>

        </div>
    );
};

export default Write;
