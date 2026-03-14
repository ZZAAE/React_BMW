const normalizeBook = ( book ) => {
    
    //첫 번째 저자만 추출
    const rawCreator = book.author || "";
    const cleanedCreator = rawCreator.split(',')[0].replace(/\s*\([^)]*\)/g, '').trim();
    
    //간단하게 장르 추출
    const rawGenre = book.categoryName || "";
    const parts = rawGenre.split('>');
    const cleanedGenre = parts.length >= 2 ? parts[parts.length - 2].trim() : rawGenre;
    
    return {
        media_type: "book",
        title: book.title,
        creator: cleanedCreator,
        thumbnail: book.cover,
        genre: cleanedGenre
    };
}

export default normalizeBook;