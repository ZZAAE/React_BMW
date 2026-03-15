import { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MediaSelection from "../components/MediaSelection";
import ReviewForm from "../components/ReviewForm";
import "./Write.css";

const Write = ({ reviewData, setReviewData, reviewInfo, setReviewInfo }) => {

    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const plusRef = useRef(null);

    // Write 페이지 진입 시 초기화 (작성 모드)
    useEffect(() => {

        if (!id) {
            return;
        }

        const editReview = reviewData.find(
            item => item.id === Number(id)
        );

        if (editReview) {
            setRating(editReview.rating);
            setReview(editReview.review);
            setReviewInfo(editReview.media_info);
        }

    }, [id, reviewData, setReviewInfo]);


    const handleFocusSearch = () => {
        plusRef.current?.focus();
    };


    const selectTag = (review) => {

        const matches = review.match(/#([^\s#]+)/g) || [];

        return [...new Set(
            matches.map(tag => tag.replace("#", ""))
        )];

    };


    const addRating = (e) => {
        setRating(e);
    };


    const addReview = (e) => {
        setReview(e.target.value);
    };


    const handleSave = () => {

        if (!reviewInfo) return;
        if (!review.trim()) return;

        const tags = selectTag(review);

        // 수정
        if (id) {

            const updateData = {
                rating: rating,
                review: review,
                updated_at: new Date().toISOString(),
                tag: tags
            };

            fetch(`/api/reviews/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            })
            .then(res => res.json())
            .then(updatedReview => {
                setReviewData(prev =>
                    prev.map(item =>
                        item.id === Number(id) ? updatedReview : item
                    )
                );
                nav("/", { replace: true });
            })
            .catch(err => {
                console.error('Failed to update review', err);
                // 에러 시 로컬 업데이트
                setReviewData(prev =>
                    prev.map(item =>
                        item.id === Number(id)
                            ? {
                                ...item,
                                rating: rating,
                                review: review,
                                updated_at: new Date().toISOString(),
                                tag: tags
                            }
                            : item
                    )
                );
                nav("/", { replace: true });
            });

        } 
        // 새 작성
        else {

            const addNewData = {
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

            fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addNewData)
            })
            .then(res => res.json())
            .then(newReview => {
                setReviewData(prev => [...prev, newReview]);
                nav("/", { replace: true });
            })
            .catch(err => {
                console.error('Failed to save review', err);
                // 에러 시 로컬 추가
                setReviewData(prev => [...prev, addNewData]);
                nav("/", { replace: true });
            });

        }

    };


    return (
        <div className="write-page">

            <div className="write-container">

                {/* LEFT */}
                <div className="write-left">

                    <MediaSelection
                        reviewInfo={reviewInfo}
                        setReviewInfo={setReviewInfo}
                        plusRef={plusRef}
                    />

                    {!reviewInfo && (
                        <div className="add-button" onClick={handleFocusSearch}>
                            +
                        </div>
                    )}

                </div>


                {/* RIGHT */}
                <div className="write-right">

                    <ReviewForm
                        rating={rating}
                        review={review}
                        onChangeRating={addRating}
                        onChangeReview={addReview}
                        handleCreate={handleSave}
                    />

                </div>

            </div>

        </div>
    );
};

export default Write;