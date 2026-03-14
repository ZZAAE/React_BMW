import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BtnSearch from "../components/BtnSearch";

const Write = ({ ReviewData, setReviewData }) => {


    const [ReviewInfo, setReviewInfo] = useState(null);
    const nav = useNavigate();
    const ReviewId = useRef(ReviewData.length);
    const reviewInfo = ReviewInfo;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    console.log(reviewInfo);
    

    const selectTag = (review) => {

        const matches = review.match(/#([^\s#]+)/g) || [];

        return [...new Set(
            matches.map(tag => tag.replace("#", ""))
        )];

    };

    const addRating = (e) => {
        setRating(Number(e.target.value));
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
            rating,
            review,
            created_at: Date.now(),
            updated_at: Date.now(),
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
        <div>
            <div>
                {!reviewInfo ? (
                    <BtnSearch setReviewInfo={setReviewInfo} />
                ) : (
                    <div>
                        <img src={reviewInfo.thumbnail} width="80" />
                        <div>{reviewInfo.title}</div>
                        <div>{reviewInfo.creator}</div>
                        <div>{reviewInfo.genre}</div>
                    </div>
                )}
            </div>
            <div>
                <input type="number" value={rating}
                    onChange={addRating} />
                <input type="text" value={review}
                    onChange={addReview} />
                <button onClick={handleCreate}>완료</button>
            </div>
        </div>
    );
};

export default Write; 