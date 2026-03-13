const BtnAction = () => {

    const [ReviewData, setReviewData] = useState();

    const handleUpdate = () => {
        
    };

    const handleDelete = () => {

    };

    return (
        <div className="BtnUD">
            <button onClick={handleUpdate}>수정</button>
            <button onClick={handleDelete}>삭제</button>
        </div>
    );
};

export default BtnAction;