//Dummy Data. 나중에 지워야함!!!
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  "Content-Type": "application/json",
};

// Search Movie
// Promise: 대기 -> 완료/에러 를 반환하는 함수.
// Promise를 사용하면 서버가 필요한 정보를 한 번에 호출할 수 있음.
// Promise.all: Promise가 가져오는 건 하나의 객체. 모든 객체를 동시에 반환할때는 all로 줘야함
async function searchMovie(query, page = 1) {
  const url = `${TMDB_BASE}/search/movie?query=${encodeURIComponent(query)}&language=ko-KR&page=${page}`;
  const res = await fetch(url, { headers });
  const data = await res.json();

  return data.results.map((movie) => ({
    id: movie.id, // id=TMDB. normalizeMovie(id)
    title: movie.title,
    thumbnail: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
  }));
}

// "media_info"로 nomalize하여 return
async function normalizeMovie(id) {
  const [detail, credits] = await Promise.all([
    fetch(`${TMDB_BASE}/movie/${id}?language=ko-KR`, { headers }).then((r) => r.json()),
    fetch(`${TMDB_BASE}/movie/${id}/credits?language=ko-KR`, { headers }).then((r) => r.json()),
  ]);

  const director = credits.crew?.find((p) => p.job === "Director")?.name ?? null;
  const cast = credits.cast?.slice(0, 5).map((p) => p.name) ?? [];

  // ✅ media_info 감싸기 제거 → flat 구조
  return {
    media_type: "movie",
    title: detail.title,
    thumbnail: detail.poster_path ? `${IMG_BASE}${detail.poster_path}` : null,
    creator: director,
    genres: detail.genres?.map(g => g.name) ?? [],
    pubDate: detail.release_date ? detail.release_date.replaceAll("-", ".") : null,
    runtime: detail.runtime ?? null,
    rating: detail.vote_average ?? null,
    cast: cast,
    description: detail.overview,
  };
}

const searchBook = async (query) => {
  const url = `/aladin/ttb/api/ItemSearch.aspx?TTBKey=${import.meta.env.VITE_ALADIN_KEY}&Query=${encodeURIComponent(query)}&QueryType=Title&SearchTarget=Book&MaxResults=10&Output=JS&Version=20131101&OptResult=subInfo`;

  const res = await fetch(url);
  const data = await res.json();

  return data.item;
};

export { searchBook, searchMovie, normalizeMovie };
