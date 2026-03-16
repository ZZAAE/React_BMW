import { useState } from "react";
import ReviewFilter from "../components/ReviewFilter";
import ReviewOrder from "../components/ReviewOrder";
import TagCard from "../components/TagCard";
import TagPopup from "../components/TagPopup";

import "./Hashtag.css";

const Hashtag = ({data}) => {
    const [filterType, setFilterType] = useState("all");
    const [orderType, setOrderType] = useState("latest");
    const [selectedTag, setSelectedTag] = useState(null);      // 선택된 태그
    const [popupReviews, setPopupReviews] = useState([]);       // 팝업에 띄울 리뷰

    const filteredData = filterType === "all"
        ? data
        : data.filter((item) => item.media_type === filterType);

    const groupByTag = (reviews) => {
        const tagMap = {};
        reviews.forEach((review) => {
            review.tag.forEach((tag) => {
                if (!tagMap[tag]) tagMap[tag] = [];
                tagMap[tag].push(review);
            });
        });
        return tagMap;
    };

    const tagMap = groupByTag(filteredData);

    const sortedTags = Object.keys(tagMap).sort((a, b) => {
        if (orderType === "latest") return tagMap[b][0].created_at.localeCompare(tagMap[a][0].created_at);
        if (orderType === "oldest") return tagMap[a][0].created_at.localeCompare(tagMap[b][0].created_at);
        if (orderType === "Krlatest") return a.localeCompare(b, "ko");
        if (orderType === "Kroldest") return b.localeCompare(a, "ko");
    });

    // 태그 카드 클릭 시 팝업 열기
    const handleTagSelect = (tag, reviews) => {
        setSelectedTag(tag);
        setPopupReviews(reviews);
    };

    // 팝업 닫기
    const handleClose = () => {
        setSelectedTag(null);
        setPopupReviews([]);
    };

    return (
        <div className="hashtag-container">
            <div className="hashtag-header">
                <h1>해시태그 모아보기</h1>
                <div className="hashtag-controls">
                    <ReviewFilter onFilter={setFilterType} />
                    <ReviewOrder onOrder={setOrderType} orderType={orderType} />
                </div>
            </div>

            <div className="tag-grid">
                {sortedTags.map((tag) => (
                    <TagCard key={tag} tag={tag} reviews={tagMap[tag]} onSelect={handleTagSelect} />
                ))}
            </div>

            {selectedTag && (
                <TagPopup tag={selectedTag} reviews={popupReviews} onClose={handleClose} />
            )}
        </div>
    );
};

export default Hashtag;