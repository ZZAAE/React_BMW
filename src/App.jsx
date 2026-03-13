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

  const [ReviewData, setReviewData] = useState(dummyReviews);
  const [ReviewInfo, setReviewInfo] = useState([]);

  return (
    <BrowserRouter>
      <Nav_Bar/>
      
      <div className="page-content">   {/* 추가 */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Write" element={<Write ReviewData={ReviewData} setReviewData={setReviewData} ReviewInfo={ReviewInfo} setReviewInfo={setReviewInfo}/>} />
            <Route path="/AllReviews" element={<AllReviews />} />
            <Route path="/Hashtag" element={<Hashtag />} />
            <Route path="/Util" element={<Util />} />
        </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
