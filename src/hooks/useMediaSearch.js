const searchBook = async (query) => {

  const url =
`/aladin/ttb/api/ItemSearch.aspx?TTBKey=ttbyour67681428001&Query=${encodeURIComponent(query)}&QueryType=Title&SearchTarget=Book&MaxResults=10&Output=JS&Version=20131101&OptResult=subInfo`;

  const res = await fetch(url);
  const data = await res.json();

  return data.item;
};


//Dummy Data. 나중에 지워야함!!!
//dummyBooks는 지웠음

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

export default {dummyMovies, searchBook};