import { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MediaSelection from "../components/MediaSelection";
import ReviewForm from "../components/ReviewForm";
import Back from "../assets/writeIcon/Back.svg?react";

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
    // 새 리뷰 작성
    if (!id) {
      setRating(0);
      setReview("");
      setReviewInfo(null);
      return;
    }

    // 수정 모드
    const editReview = reviewData.find((item) => item.id === Number(id));

    if (editReview) {
      setRating(editReview.rating);
      setReview(editReview.review);
      setReviewInfo({
        ...editReview.media_info,
        media_type: editReview.media_type,  // ← 추가
        rating: editReview.rating,          // ← 추가
        genres: editReview.media_info.genre
          ? [editReview.media_info.genre]
          : [],                             // ← genre 문자열 → 배열 변환
      });
    }
  }, [id, reviewData, setReviewInfo]);

  const handleFocusSearch = () => {
    plusRef.current?.focus();
  };

  const selectTag = (review) => {
    const matches = review.match(/#([^\s#]+)/g) || [];

    return [...new Set(matches.map((tag) => tag.replace("#", "")))];
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
        tag: tags,
      };

      fetch(`/api/review/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Update failed");
          return res.text();
        })
        .then((data) => {
          console.log("server response:", data);

          setReviewData((prev) =>
            prev.map((item) =>
              item.id === Number(id) ? { ...item, ...updateData } : item,
            ),
          );
          nav("/", { replace: true });
        })
        .catch((err) => {
          console.error("Failed to update review", err);
          setReviewData((prev) =>
            prev.map((item) =>
              item.id === Number(id)
                ? {
                  ...item,
                  rating: rating,
                  review: review,
                  updated_at: new Date().toISOString(),
                  tag: tags,
                }
                : item,
            ),
          );
          nav("/", { replace: true });
        });
      console.log("handleSave updateData:", updateData);
    }
    // 새 작성
    else {
      const addNewData = {
        id: Date.now(),
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
          genres: reviewInfo.genres,
          pubDate: reviewInfo.pubDate,
          description: reviewInfo.description,
          runtime: reviewInfo.runtime,
        },
      };

      fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addNewData),
      })
        .then((res) => res.json())
        .then((newReview) => {
          setReviewData((prev) => [...prev, newReview]);
          nav("/", { replace: true });
        })
        .catch((err) => {
          console.error("Failed to save review", err);
          setReviewData((prev) => [...prev, addNewData]);
          nav("/", { replace: true });
        });
    }
  };

  return (
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

          <MediaSelection
            reviewInfo={reviewInfo}
            dataType = {reviewInfo?.media_type}
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
            reviewInfo={reviewInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default Write;
