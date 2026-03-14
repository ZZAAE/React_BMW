const ReviewOrder = ({ onOrder, orderType }) => {
    return (
        <select onChange={(e) => onOrder(e.target.value)} value={orderType}>
            <option value="latest">최신 순</option>
            <option value="oldest">오래된 순</option>
            <option value="Krlatest">제목 순</option>
            <option value="Kroldest">제목 역순</option>
        </select>
    );
}; export default ReviewOrder;