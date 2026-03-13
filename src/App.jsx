import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav_Bar from './components/Nav_Bar'
import { ReviewList } from './components/ReviewList'
import { dummyReviews } from './hooks/dummyReviews'

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Nav_Bar />

      <Routes>
        <Route path="/" element={<ReviewList data={dummyReviews} type="latest" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
