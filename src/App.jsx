import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav_Bar from './components/Nav_Bar'
import './App.css'
import AllReviews from './pages/AllReviews'
import Home from './pages/Home'
import Write from './pages/Write'
import Hashtag from './pages/Hashtag'
import Util from './pages/Util'
import { useState } from 'react'
import { dummyReviews } from './hooks/dummyReviews'

function App() {

  const [reviewData, setReviewData] = useState(dummyReviews);
  const [reviewInfo, setReviewInfo] = useState(null);

  console.log("App reviewData:", reviewData);
  console.log("App render", reviewData.length);

  return (
    <BrowserRouter>

      {/* <Nav_Bar/> */}

      <Routes>
        <Route path="/" element={<Home />} />

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

        <Route path="/AllReviews" element={<AllReviews />} />
        <Route path="/Hashtag" element={<Hashtag />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App