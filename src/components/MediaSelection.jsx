import BtnSearch from "./BtnSearch";
import "./MediaSelection.css";

const MediaSelection = ({ reviewInfo, setReviewInfo, plusRef }) => {

    console.log(reviewInfo)

    return (

        <div className="media-section">

            {!reviewInfo ? (

                <BtnSearch setReviewInfo={setReviewInfo} plusRef={plusRef} />

            ) : (

                <div className="media-preview">

                    <img
                        src={reviewInfo.thumbnail}
                        alt={reviewInfo.title}
                    />

                    <div className="media-title">
                        {reviewInfo.title}
                    </div>

                    <div className="media-genre">

                        {reviewInfo.genres &&
                            reviewInfo.genres.map((genre, index) => (
                                <span key={index} className="genre-tag">
                                    {genre}
                                </span>
                            ))
                        }

                    </div>

                    <div className="media">
                        <div className="media-description-label">
                            {/* {(!reviewInfo.runtime) ? "저자" : "감독"} */}
                            {reviewInfo.media_type === "movie" ? "감독" : "저자"}
                        </div>
                        <div className="media-description-child">
                            {reviewInfo.creator}
                        </div>
                    </div>


                    {/* <div className="media-pages">
                        {reviewInfo.pages}
                    </div> */}

                    <div className="media">
                        <div className="media-description-label">
                            {/* {(!reviewInfo.runtime) ? "출판" : "개봉"} */}
                            {reviewInfo.media_type === "movie" ? "개봉" : "출판"}
                        </div>
                        <div className="media-description-child">
                            {reviewInfo.pubDate}
                        </div>
                    </div>

                    {reviewInfo.media_type === "movie" && (
                        <div className="media">
                            <div className="media-description-label">상영시간</div>
                            <div className="media-description-child">{reviewInfo.runtime}분</div>
                        </div>
                    )}

                    <div className="media">
                        <div className="media-description-label">
                            평점
                        </div>
                        <div className="media-description-child">
                            ⭐ {reviewInfo.rating}
                        </div>
                    </div>

                    <div className="media">
                        <div className="media-description-label">
                            소개
                        </div>
                        <div className="media-description-child">
                            {reviewInfo.description}
                        </div>
                    </div>

                </div>

            )}

        </div>
    );
};

export default MediaSelection;