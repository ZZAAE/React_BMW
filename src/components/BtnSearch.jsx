import { dummyReviews } from "../hooks/dummyReviews";


const BtnSearch = ({setReviewInfo}) => {


    const addInfo = () => {

        const { media_type, title, creator, thumbnail, genre } = dummyReviews[0];

        setReviewInfo({
            media_type,
            title,
            creator,
            thumbnail,
            genre,
        });

    };


    return (
        <div>
            <button onClick={addInfo}>영화</button>
            <button onClick={addInfo}>도서</button>
        </div>
        
        
    );

}

export default BtnSearch;