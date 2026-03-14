import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Preview = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/reviews/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Review not found');
        return res.json();
      })
      .then(data => {
        setReview(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!review) return <div>Review not found</div>;

  return (

  );
    
};

export default Preview;
