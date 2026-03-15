import express from 'express';
import cors from 'cors';

// In-memory storage for reviews (replace with DB later)
import { dummyReviews } from './src/hooks/dummyReviews.js';
let reviews = dummyReviews;

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// // In-memory storage for reviews (replace with DB later)
// let reviews = [
//   {
//     id: 1,
//     media_type: "book",
//     rating: 4.5,
//     review: "코드를 바라보는 시각이 완전히 바뀌었다.",
//     created_at: "2026-01-03T00:00:00.000Z",
//     updated_at: "2026-01-03T00:00:00.000Z",
//     tag: ["IT/기술", "프로그래밍"],
//     media_info: {
//       title: "클린 코드",
//       creator: "로버트 C. 마틴",
//       thumbnail: "https://bookthumb-phinf.pstatic.net/thumb/137/995/13799541.jpg",
//       genre: "IT/기술"
//     }
//   }
// ];

// GET /api/review - 전체 리뷰 가져오기
app.get('/api/review', (req, res) => {
  res.json(reviews);
});

// GET /api/review/:id - 특정 리뷰 가져오기
app.get('/api/review/:id', (req, res) => {
  const id = req.params.id;
  const review = reviews.find(r => r.id == id);
  if (review) {
    res.json(review);
  } else {
    res.status(404).json({ error: 'Review not found' });
  }
});

// POST /api/review - 새 리뷰 추가
app.post('/api/review', (req, res) => {
  const newReview = req.body;
  newReview.id = Date.now(); // 간단한 ID 생성
  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// PUT /api/review/:id - 리뷰 수정
app.put('/api/review/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;

  const index = reviews.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }

  reviews[index] = {
    ...reviews[index],
    ...updatedData,
    id: id
  };

  res.json(reviews[index]);
});