// 검색 알고리즘: searchFile => 제목 검색을 통해 검색된 배열 반환.
const searchFile = (data, title) => {
    return data.array.map((data) => data.title === title ? data : null)
};

// SORT 알고리즘
const filteredTitle = (data) => {
    return data.sort((a, b) => a.title.toUpperCase() - b.title.toUpperCase());
}

// -- STRING 필터링: rating, revDate, pubDate
const filteredRate = (data) => {
    return data.sort((a, b) => a.rating - b.rating);
}

const filteredRevDate = (data) => {
    return data.sort((a, b) => a.revDate - b.revDate);
}

const filteredPubDate = (data) => {
    return data.sort((a, b) => a.pubDate - b.pubDate);
}



export {searchFile, filteredTitle, filteredPubDate, filteredRate, filteredRevDate}