export const useReviewList = (ReviewData, orderType) => {

    const sortedData = [...ReviewData].sort((a, b) => {

        if(orderType === "latest"){
            return b.createdDate - a.createdDate;
        }

        if(orderType === "oldest"){
            return a.createdDate - b.createdDate;
        }

        if(orderType === "Krlatest"){
            return b.name.localeCompare(a.name, "ko");
        }

        if(orderType === "Kroldest"){
            return a.name.localeCompare(b.name, "ko");
        }

    });

    return sortedData;
};