import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav_Bar from './components/Nav_Bar'
import './App.css'
import AllReviews from './pages/AllReviews'
import Home from './pages/Home'
import Write from './pages/Write'
import Hashtag from './pages/Hashtag'
import { useState } from 'react'
import { dummyReviews } from './hooks/dummyReviews'

function App() {

  const [ReviewData, setReviewData] = useState(dummyReviews);
  const [ReviewInfo, setReviewInfo] = useState(null);

  return (
    <BrowserRouter>

      <Nav_Bar/>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/Write"
          element={
            <Write
              ReviewData={ReviewData}
              setReviewData={setReviewData}
              ReviewInfo={ReviewInfo}
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