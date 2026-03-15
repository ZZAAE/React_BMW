const getWeeklyRange = () => {
    const now = new Date();

    const monday = new Date(now);
    console.log(monday)
    monday.setDate(now.getDate() - (now.getDay() === 0 ? 7 : now.getDay()) +1)
    monday.setHours(0, 0, 0, 0)

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23, 59, 59, 999)

    console.log(monday, ", ", sunday)
    return {monday, sunday};
};
export default getWeeklyRange;