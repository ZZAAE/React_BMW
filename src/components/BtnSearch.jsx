import { dummyReviews } from "../hooks/dummyReviews";

//const [reviewInfo ,setReviewInfo] = useState([]);

const BtnSearch = ({setReviewInfo}) => {
    const reviewInfo = dummyReviews[0];
    
    const Info = {
        media_type: reviewInfo.media_type,
        title: reviewInfo.title,
        creator: reviewInfo.creator,
        thumbnail: reviewInfo.thumbnail,
        genre: reviewInfo.genre,
    }


    return setReviewInfo(Info);

}

export default BtnSearch;