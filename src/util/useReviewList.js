const useReviewList = (ReviewData, orderType) => {

    const sortedData = [...ReviewData].sort((a, b) => {

        if(orderType === "oldest"){
            return new Date(a.updated_at) -  new Date(b.updated_at);
        }
        
        if(orderType === "latest"){
            return new Date(b.updated_at) - new Date(a.updated_at);
        }

        if(orderType === "Kroldest"){
            return b.media_info.title.localeCompare(a.media_info.title, "ko");
        }

        if(orderType === "Krlatest"){
            return a.media_info.title.localeCompare(b.media_info.title, "ko");
        }

    });

    return sortedData;
};
export default useReviewList;