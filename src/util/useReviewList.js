const useReviewList = (ReviewData, orderType) => {

    const sortedData = [...ReviewData].sort((a, b) => {

        if(orderType === "latest"){
            return b.created_at - a.created_at;
        }

        if(orderType === "oldest"){
            return a.created_at - b.created_at;
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

const useFilteredList = (ReviewData, orderType) => {
    
    const sortedData = [...ReviewData].sort((a, b) => {

        if(orderType === "latest"){
            return b.created_at - a.created_at;
        }

        if(orderType === "oldest"){
            return a.created_at - b.created_at;
        }

        if(orderType === "Krlatest"){
            return b.name.localeCompare(a.name, "ko");
        }

        if(orderType === "Kroldest"){
            return a.name.localeCompare(b.name, "ko");
        }

    });

    return sortedData;
}

export default {useReviewList, useFilterdList}