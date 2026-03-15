import { useRef, useState } from "react";
import { searchMovie, searchBook, normalizeMovie } from "../hooks/useMediaSearch";
import normalizeBook from "../hooks/normalizeBook";
import "./BtnSearch.css";

const BtnSearch = ({ setReviewInfo, plusRef }) => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const typeRef = useRef();

    // serchMovie
    const handleMovieSearch = async () => {
        if (!query) return;

        const movies = await searchMovie(query);
        if (!movies || movies.length === 0) return;

        typeRef.current = 1;
        console.log(movies);
        setResults(movies);
        setShowResults(true);
        // setQuery(); //초기화 !중요
    }

    const addBookInfo = async () => {
        if (!query) return;

        const books = await searchBook(query);
        if (!books || books.length === 0) return;
        typeRef.current = 2;

        // 전처리 적용
        const normalizedBooks = books.map(normalizeBook);
        setResults(normalizedBooks);
        setShowResults(true); //책 리스트 표시 나중에 css에서 표시했을 때 다른 거 안 밀리게 조정해야함.
    };

    const selectItem = async (item) => {
        if (typeRef.current === 2) {
            setReviewInfo({
                media_type: item.media_type,
                title: item.title,
                creator: item.creator,
                thumbnail: item.thumbnail,
                genres: item.genres,
                // pages: book.pages,
                publisher: item.publisher,
                rating: item.rating,
                description: item.description,
                pubDate: item.pubDate,
                runtime: (item.runtime) ? item.runtime : null,
            });
        }
        else if (typeRef.current === 1) {
            const normalized = await normalizeMovie(item.id);
            setReviewInfo(normalized.media_info);
        }
        setShowResults(false);
        setQuery("");

        console.log(!item.runtime ? "movie" : "book");
    }


    return (
        <div className="search-container">
            <input
                ref={plusRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="영화 / 도서 검색"
            />

            <button onClick={handleMovieSearch}>영화</button>
            <button onClick={addBookInfo}>도서</button>

            {showResults && results.length > 0 && (
                <ul>
                    {results.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => selectItem(item)}
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                width="50"
                            />
                            <div>
                                <div><strong>{item.title}</strong></div>
                                <div>{item.creator}</div>
                                <div>{item.genre}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BtnSearch;