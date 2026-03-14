import { useState } from "react";
import { searchMovie } from "../hooks/useMediaSearch";
// import { searchBook } from "../hooks/useMediaSearch";


const BtnSearch = ({ setReviewInfo }) => {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState({ movie: true, book: true });

    const toggleType = (type) => {
        setSelected(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const handleSearch = async () => {
        if (!query) return;

        const results = [];

        if (selected.movie) {
            const movies = await searchMovie(query);
            results.push(...movies);
        }

        if (selected.book) {
            //const books = await searchBook(query);
            //results.push(...books);
            console.log("selected.book")
        }

        setReviewInfo(results);
    };


    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="제목을 입력하세요"
            />

            <button onClick={() => toggleType("movie")} className={selected.movie ? "active" : ""}>
                영화
            </button>

            <button onClick={() => toggleType("book")} className={selected.book ? "active" : ""}>
                도서
            </button>

            <button onClick={handleSearch}>검색</button>
        </div>
    );

}

export default BtnSearch;