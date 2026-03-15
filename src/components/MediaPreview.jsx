import "./MediaSelection.css";


const MediaPreview = ({ review }) => {

  console.log("MediaPreview review:", review);
  return (
    <div className="media-preview">
      <img src={review.media_info.thumbnail} alt={review.media_info.title} />

      <div className="media-title">{review.media_info.title}</div>

      <div className="media-genre">
        {review.media_info.genres &&
          review.media_info.genres.map((genre, index) => (
            <span key={index} className="genre-tag">
              {genre}
            </span>
          ))}
      </div>

      <div className="media">
        <div className="media-description-label">{(!review.media_info.runtime) ? "저자" : "감독"}</div>
        <div className="media-description-child">{review.media_info.creator}</div>
      </div>

      {/* <div className="media-pages">
                        {reviewInfo.pages}
                    </div> */}

      <div className="media">
        <div className="media-description-label">{(!review.media_info.runtime) ? "출판" : "개봉"}</div>
        <div className="media-description-child">{review.media_info.pubDate}</div>
      </div>

      <div className="media">
        <div className="media-description-label">평점</div>
        <div className="media-description-child">⭐ {review.rating}</div>
      </div>

      <div className="media">
        <div className="media-description-label">소개</div>
        <div className="media-description-child">{review.media_info.description}</div>
      </div>
    </div>
  );
};

export default MediaPreview;