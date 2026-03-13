import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useReviewList from "../util/useReviewList";

export const ReviewList = ({ data }) => {
    const navigate = useNavigate();
    const [orderType, setOrderType] = useState("latest");

    const sortedData = useReviewList(data, orderType);

    return (
        <div>
            <div className="orderReview">
                <select onChange={(e) => setOrderType(e.target.value)} value={orderType} >
                    <option value="latest">최신 순</option>
                    <option value="oldest">오래된 순</option>
                    <option value="Krlatest">제목 순</option>
                    <option value="Kroldest">제목 역순</option>
                </select>
            </div>

            {sortedData.map((item) => (
                <button key={item.id} onClick={() => navigate(`/review/${item.id}`)}>
                    <h3>{item.media_info.title}</h3>
                    <img src={item.image} alt={item.title} />
                </button>
            ))}
            {/* {dummyReviews.map((item) => (
                <button key={item.id} onClick={() => navigate(`/review/${item.id}`)}>
                    <h3>{item.media_info.title}</h3>
                    <img src={item.image} alt={item.title} />
                </button>
            ))} */}
        </div>
    );
}