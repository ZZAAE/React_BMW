import { dummyReviews } from "../hooks/dummyReviews";

//const [reviewInfo ,setReviewInfo] = useState([]);

const BtnSearch = ({ setReviewInfo }) => {

    const addInfo = () => {

        const { media_type, title, creator, thumbnail, genre } = dummyReviews[0];

        setReviewInfo({
            media_type,
            title,
            creator,
            thumbnail,
            genre
        });

    };


    return (
        <button onClick={addInfo}>+</button>
    );

}

export default BtnSearch;