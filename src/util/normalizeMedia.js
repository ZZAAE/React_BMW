// JSON -> array 정규화

const jsonToArray = (data) => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
}

export default jsonToArray;