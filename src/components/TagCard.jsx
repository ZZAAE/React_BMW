import "./TagCard.css";

const TagCard = ({ tag, reviews, onSelect }) => {
  return (
    <div className="tag">
      <div className="tag-card" onClick={() => onSelect(tag, reviews)}>
        <div className="tag-thumbnails">
          {reviews.slice(0, 3).map((review) => (
            <img
              key={review.id}
              src={review.media_info.thumbnail}
              alt={review.media_info.title}
            />
          ))}
        </div>
      </div>
      <p className="tag-name">#{tag}</p>
    </div>
  );
};

export default TagCard;
