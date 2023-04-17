const addDateSuffix = (date) => {
    let dateStr = date.toString();

    const lastChar = dateStr.charAt(dateStr.length - 1);
    if (lastChar === '1' && dateStr !== '11') {
        dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }
    return dateStr;
};

module.exports = (
    timestamp,
    { monthLength = 'short', addDateSuffix = true } = {} ) => {
    const months = {
        0: monthLength === 'short' ? 'Jan' : 'January',
        1: monthLength === 'short' ? 'Feb' : 'Febuary',
        2: monthLength === 'short' ? 'March' : 'March',
        3: monthLength === 'short' ? 'April' : 'April',
        4: monthLength === 'short' ? 'May' : 'may',
        5: monthLength === 'short' ? 'June' : 'June',
        6: monthLength === 'short' ? 'July' : 'July',
        7: monthLength === 'short' ? 'Aug' : 'August',
        8: monthLength === 'short' ? 'Sept' : 'September',
        9: monthLength === 'short' ? 'Oct' : 'October',
        10: monthLength === 'short' ? 'Nov' : 'November',
        11: monthLength === 'short' ? 'Dec' : 'December',
    };

    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    const dayOfMonth = addDateSuffix
        ? addDateSuffix(dateObj.getDate())
        : dateObj.getDate();

    const year = dateObj.getFullYear();
    let hour =
        dateObj.getHours() > 12
            ? Math.floor(dateObj.getHours() - 12)
            : dateObj.getHours();
        
        if (hour === 0) {
            hour = 12;
        }

        const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

        const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

        const formattedTimestamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`
        
        return formattedTimestamp;
    };
