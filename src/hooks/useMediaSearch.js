//Dummy Data. 나중에 지워야함!!!
const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  'Content-Type': 'application/json',
};

// Search Movie
// Promise: 대기 -> 완료/에러 를 반환하는 함수.
// Promise를 사용하면 서버가 필요한 정보를 한 번에 호출할 수 있음.
// Promise.all: Promise가 가져오는 건 하나의 객체. 모든 객체를 동시에 반환할때는 all로 줘야함
async function useSearchMovie(query, page = 1) {
  const url = `${TMDB_BASE}/search/movie?query=${encodeURIComponent(query)}&language=ko-KR&page=${page}`;
  const res = await fetch(url, { headers });
  const data = await res.json();

  return data.results.map(movie => ({
    id: movie.id,               // id=TMDB. normalizeMovie(id)
    title: movie.title,
    thumbnail: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
  }));
}

// "media_info"로 nomalize하여 return
async function normalizeMovie(id) {
  const [detail, credits] = await Promise.all([
    fetch(`${TMDB_BASE}/movie/${id}?language=ko-KR`, { headers }).then(r => r.json()), // title, thumbnail, genre, runtime, release, rating
    fetch(`${TMDB_BASE}/movie/${id}/credits?language=ko-KR`, { headers }).then(r => r.json()), // creator, cast
  ]);

  //감독: `crew`에서 `job`으로 검색
  const director = credits.crew?.find(p => p.job === 'Director')?.name ?? null;
  const cast = credits.cast?.slice(0, 5).map(p => p.name) ?? [];

  return {
    media_info: {
      title: detail.title,
      thumbnail: detail.poster_path ? `${IMG_BASE}${detail.poster_path}` : null,
      director: director,
      genre: detail.genres?.map(g => g.name) ?? [],
      pubDate: detail.release_date ?? null, 
      runtime: detail.runtime ?? null,        // minutes
      avgRating: detail.vote_average ?? null,    // float: MAX(10.0)
      cast: cast,                        // array
    },
  };
}

  const dummyBooks = [
    {
      "title": "클린 코드",
      "isbn": "9788966260959",
      "author": "로버트 C. 마틴",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/137/995/13799541.jpg",
      "description": "애자일 소프트웨어 장인 정신을 담은 책. 좋은 코드와 나쁜 코드를 구분하고, 나쁜 코드를 좋은 코드로 바꾸는 방법을 설명한다.",
      "pubdate": "20131215"
    },
    {
      "title": "아몬드",
      "isbn": "9788954651269",
      "author": "손원평",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/149/982/14998281.jpg",
      "description": "감정을 느끼지 못하는 소년 윤재의 성장 이야기. 2019 한국과학문학상 수상작.",
      "pubdate": "20170503"
    },
    {
      "title": "부의 추월차선",
      "isbn": "9788996328117",
      "author": "엠제이 드마코",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/062/697/06269773.jpg",
      "description": "평범한 직장인의 틀을 깨고 젊어서 부자가 되는 방법을 제시한 재테크 필독서.",
      "pubdate": "20110801"
    },
    {
      "title": "미라클 모닝",
      "isbn": "9791187481027",
      "author": "할 엘로드",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/116/937/11693763.jpg",
      "description": "아침 1시간이 인생을 바꾼다. 성공한 사람들의 아침 루틴을 통해 삶을 변화시키는 방법을 소개한다.",
      "pubdate": "20160912"
    },
    {
      "title": "파친코",
      "isbn": "9791190090024",
      "author": "이민진",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/163/523/16352371.jpg",
      "description": "재일교포 4대의 삶을 그린 대하소설. 차별과 생존, 정체성을 둘러싼 인간 군상을 섬세하게 묘사한다.",
      "pubdate": "20190823"
    },
    {
      "title": "그로킹 알고리즘",
      "isbn": "9788966263080",
      "author": "아디트야 바르가바",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/148/391/14839144.jpg",
      "description": "그림으로 쉽게 배우는 알고리즘 입문서. 복잡한 개념을 시각적으로 풀어내 초보자도 이해하기 쉽다.",
      "pubdate": "20170601"
    },
    {
      "title": "원씽",
      "isbn": "9788901180472",
      "author": "게리 켈러",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/084/068/08406896.jpg",
      "description": "성공의 핵심은 단 하나에 집중하는 것. 삶의 우선순위를 정리하고 진짜 중요한 일에만 집중하는 법을 알려준다.",
      "pubdate": "20140304"
    },
    {
      "title": "채식주의자",
      "isbn": "9788936434595",
      "author": "한강",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/068/707/06870792.jpg",
      "description": "한국 소설 최초 맨부커상 수상작. 육식 거부라는 소극적 저항으로 시작된 한 여성의 비극적 변화를 그린다.",
      "pubdate": "20070130"
    },
    {
      "title": "넛지",
      "isbn": "9788901107721",
      "author": "리처드 탈러, 캐스 선스타인",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/054/033/05403347.jpg",
      "description": "행동경제학의 고전. 사람들의 선택을 유도하는 부드러운 개입인 '넛지'의 원리와 사례를 소개한다.",
      "pubdate": "20090105"
    },
    {
      "title": "도커 & 쿠버네티스",
      "isbn": "9791165920616",
      "author": "용찬호",
      "image": "https://bookthumb-phinf.pstatic.net/thumb/175/390/17539022.jpg",
      "description": "컨테이너 기반 인프라의 핵심 기술인 도커와 쿠버네티스를 실습 중심으로 배울 수 있는 실전 가이드.",
      "pubdate": "20211020"
    }
  ];

  const dummyMovies = [
    {
      "title": "인터스텔라",
      "genre": "액션/SF",
      "image": "https://movie-phinf.pstatic.net/20211115_278/1636946449487none_JPEG/movie_image.jpg",
      "pubDate": "2014",
      "director": "크리스토퍼 놀란",
      "actor": "매튜 맥커너히, 앤 해서웨이, 제시카 차스테인",
      "userRating": 9.32
    },
    {
      "title": "어벤져스: 엔드게임",
      "genre": "액션/SF",
      "image": "https://movie-phinf.pstatic.net/20190424_150/1556089150823none_JPEG/movie_image.jpg",
      "pubDate": "2019",
      "director": "앤서니 루소, 조 루소",
      "actor": "로버트 다우니 주니어, 크리스 에반스, 스칼렛 요한슨",
      "userRating": 8.95
    },
    {
      "title": "라라랜드",
      "genre": "로맨스",
      "image": "https://movie-phinf.pstatic.net/20170118_36/1484710805916none_JPEG/movie_image.jpg",
      "pubDate": "2016",
      "director": "데미안 셔젤",
      "actor": "라이언 고슬링, 엠마 스톤",
      "userRating": 8.77
    },
    {
      "title": "비포 선라이즈",
      "genre": "로맨스",
      "image": "https://movie-phinf.pstatic.net/20120604_25/1338783988062none_JPEG/movie_image.jpg",
      "pubDate": "1995",
      "director": "리처드 링클레이터",
      "actor": "에단 호크, 줄리 델피",
      "userRating": 8.61
    },
    {
      "title": "콰이어트 플레이스",
      "genre": "공포/스릴러",
      "image": "https://movie-phinf.pstatic.net/20180412_167/1523499307454none_JPEG/movie_image.jpg",
      "pubDate": "2018",
      "director": "존 크래신스키",
      "actor": "에밀리 블런트, 존 크래신스키, 밀리센트 시먼즈",
      "userRating": 7.89
    },
    {
      "title": "기생충",
      "genre": "공포/스릴러",
      "image": "https://movie-phinf.pstatic.net/20190528_266/1559024198386none_JPEG/movie_image.jpg",
      "pubDate": "2019",
      "director": "봉준호",
      "actor": "송강호, 이선균, 조여정, 최우식",
      "userRating": 9.01
    },
    {
      "title": "쇼생크 탈출",
      "genre": "드라마",
      "image": "https://movie-phinf.pstatic.net/20120907_125/1347006292804none_JPEG/movie_image.jpg",
      "pubDate": "1994",
      "director": "프랭크 다라본트",
      "actor": "팀 로빈스, 모건 프리먼",
      "userRating": 9.45
    },
    {
      "title": "포레스트 검프",
      "genre": "드라마",
      "image": "https://movie-phinf.pstatic.net/20120604_43/1338784469843none_JPEG/movie_image.jpg",
      "pubDate": "1994",
      "director": "로버트 저메키스",
      "actor": "톰 행크스, 로빈 라이트",
      "userRating": 9.22
    },
    {
      "title": "센과 치히로의 행방불명",
      "genre": "애니메이션/코미디",
      "image": "https://movie-phinf.pstatic.net/20120604_298/1338784680952none_JPEG/movie_image.jpg",
      "pubDate": "2001",
      "director": "미야자키 하야오",
      "actor": "히이라기 다이스케, 유이미호, 나가토 이사오",
      "userRating": 9.37
    },
    {
      "title": "극한직업",
      "genre": "애니메이션/코미디",
      "image": "https://movie-phinf.pstatic.net/20190116_22/1547607262461none_JPEG/movie_image.jpg",
      "pubDate": "2019",
      "director": "이병헌",
      "actor": "류승룡, 이하늬, 진선규, 이동휘",
      "userRating": 8.54
    }
  ];

  export default { dummyBooks, dummyMovies }
  export {useSearchMovie, normalizeMovie}