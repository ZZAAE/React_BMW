const normalizeBook = (book) => {

  // 장르 분리
  const genres = book.categoryName
    ? book.categoryName.split(">").map(g => g.trim())
    : [];

  // 저자
  const author = book.author
    ? book.author.split(",")[0].replace(/ 지은이| 저자| 옮긴이/g, "").trim()
    : "";

  return {

    media_type: "book",

    title: book.title || "",

    creator: author,

    genres: genres,

    pubDate: book.pubDate || "",

    // pages: book.subInfo?.itemPage || null,

    publisher: book.publisher || "",

    rating: book.customerReviewRank
      ? book.customerReviewRank  : 0,

    description: book.description || "",

    thumbnail: book.cover || ""

  };

};

export default normalizeBook;