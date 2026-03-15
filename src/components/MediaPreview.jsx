import "./MediaSelection.css";


const MediaPreview = ({ review }) => {
  return (
    <div className="media-preview">
      <img src={review.media_info.thumbnail} alt={review.media_info.title} />

      <div className="media-title">{review.media_info.title}</div>

      <div className="media-genre">
        {review.genres &&
          review.genres.map((genre, index) => (
            <span key={index} className="genre-tag">
              {genre}
            </span>
          ))}
      </div>

      <div className="media">
        <div className="media-description-label">저자</div>
        <div className="media-description-child">{review.media_info.creator}</div>
      </div>

      {/* <div className="media-pages">
                        {reviewInfo.pages}
                    </div> */}

      <div className="media">
        <div className="media-description-label">출판</div>
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