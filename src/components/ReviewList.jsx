import { useNavigate } from "react-router-dom";
import { useReviewList } from "../util/useReviewList";

export const ReviewList = ({data, type}) => {
    const navigate = useNavigate();

    const getSortedData = () => {
        return useReviewList.sortedData({data, type});
    }
    const sortedData = getSortedData();

    return (
        <div>
           {sortedData.map((item) => (
                <button key={item.id} onClick={() => navigate(`/review/${item.id}`)}>
                    <img src={item.image} alt={item.title} />
                </button>
            ))}
        </div>
    );
}