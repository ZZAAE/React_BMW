import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav_Bar from "./components/Nav_Bar";
import "./App.css";
import AllReviews from "./pages/AllReviews";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Preview from "./pages/Preview";
import Hashtag from "./pages/Hashtag";
import Util from "./pages/Util";
import { useState, useEffect } from "react";

function App() {
  const [reviewData, setReviewData] = useState([]);
  const [reviewInfo, setReviewInfo] = useState(null);

  // 서버에서 리뷰 데이터 가져오기
  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviewData(data))
      .catch(err => console.error('Failed to fetch reviews', err));
  }, []);

  console.log("App reviewData:", reviewData);
  console.log("App render", reviewData.length);

  return (
    <BrowserRouter>
      <Nav_Bar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/review/:id" element={<Preview />} />

          <Route
            path="/Write"
            element={
              <Write
                reviewData={reviewData}
                setReviewData={setReviewData}
                reviewInfo={reviewInfo}
                setReviewInfo={setReviewInfo}
              />
            }
          />

          <Route path="/:id" element={<Preview reviewData={reviewData} setReviewData={setReviewData} />} />

          <Route path="/AllReviews" element={<AllReviews reviewData={reviewData} />} />
          <Route path="/Hashtag" element={<Hashtag />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
