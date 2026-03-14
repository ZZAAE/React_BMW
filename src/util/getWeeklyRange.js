const getWeeklyRange = () => {
    const now = new Date();

    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1)
    monday.setHours(0, 0, 0, 0)

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23, 59, 59, 999)

    return {monday, sunday};
};
export default getWeeklyRange;