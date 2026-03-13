import { useNavigate } from "react-router-dom";
import { useReviewList } from "../util/useReviewList";
import { dummyReviews } from "../hooks/dummyReviews";

export const ReviewList = ({type}) => {
    const navigate = useNavigate();

    const sortedData = useReviewList.sortedData(dummyReviews, {type});

    return (
        <div>
            <divider />
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