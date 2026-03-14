import MediaSearch from "../hooks/useMediaSearch";
import normalizeBook from "../hooks/normalizeBook";
import { useState } from "react";
import "./BtnSearch.css";

const BtnSearch = ({setReviewInfo, plusRef}) => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const { searchBook } = MediaSearch;

    const addBookInfo = async () => {

        const books = await searchBook(query);
        if (!books || books.length === 0) return;

        // 전처리 적용
        const normalizedBooks = books.map(normalizeBook);
        setResults(normalizedBooks);
        setShowResults(true); //책 리스트 표시 나중에 css에서 표시했을 때 다른 거 안 밀리게 조정해야함.
    };

    const selectBook = (book) => {
        setReviewInfo({
            media_type: book.media_type,
            title: book.title,
            creator: book.creator,
            thumbnail: book.thumbnail,
            genres: book.genres,
            // pages: book.pages,
            publisher: book.publisher,
            rating: book.rating,
            description: book.description,
            pubDate: book.pubDate,
        });
        setShowResults(false); //책 리스트 숨김
        setQuery(""); //초기화 !중요

    };

    
    return (
        <div className="search-container">
            <input
                ref={plusRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="영화 / 도서 검색"
            />

            <button>영화</button>
            <button onClick={addBookInfo}>도서</button>

            {showResults && results.length > 0 && (
                <ul>
                    {results.map((book, index) => (
                        <li
                            key={index}
                            onClick={() => selectBook(book)}
                            >
                            <img
                                src={book.thumbnail}
                                alt={book.title}
                                width="50"
                            />
                            <div>
                                <div><strong>{book.title}</strong></div>
                                <div>{book.creator}</div>
                                <div>{book.genre}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BtnSearch;