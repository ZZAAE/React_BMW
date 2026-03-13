
const ReviewSearch = ({setOrderType}) => {

    
    return (
        <div className="orderReview">
            <select onChange={(e) => setOrderType(e.target.value)} >
                <option value="latest">최신 순</option>
                <option value="oldest">오래된 순</option>
                <option value="Krlatest">제목 순</option>
                <option value="Kroldest">제목 역순</option>
            </select>
        </div>
    );
};

export default ReviewSearch;