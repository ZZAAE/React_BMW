import { useNavigate } from "react-router-dom";
// import { useReviewList } from "../util/useReviewList";

export const ReviewList = ({data}) => {
    const navigate = useNavigate();

    // const sortedData = useReviewList.sortedData(dummyReviews, {type});

    return (
        <div>
            <divider />
            {data.map((item) => (
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