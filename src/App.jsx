import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav_Bar from './components/Nav_Bar'
import { ReviewList } from './components/ReviewList'
import { dummyReviews } from './hooks/dummyReviews'
import './App.css'
import Write from './pages/Write'

function App() {

  return (
    <BrowserRouter>
      <Write/>
      <Nav_Bar />

      <Routes>
        <Route path="/ReviewList" element={<ReviewList data={dummyReviews} type="latest" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
