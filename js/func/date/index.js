export const parseMonthYear = date => {
    if (!date) {
        return new Date();
    }
    return new Date(date);
};

export const sortByDates = (a, b) => {
    const dateA = parseMonthYear(a);
    const dateB = parseMonthYear(b);
    return dateB - dateA;
};

export const formatMonthLabel = dateStr => {
    if (!dateStr) {
        return "";
    }

    const date = new Date(dateStr);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const year = date.getFullYear();
    const monthIndex = date.getMonth(); // 0-based index
    const monthAbbr = monthNames[monthIndex];

    return `${monthAbbr}. ${year}`;
};

export const formatDate = (start, end) => {
    return [start, end].filter(Boolean).join(" - ");
};

export const minYear = 1970;
export const maxYear = new Date().getFullYear() + 6;

export const validateYear = date => {
    return date <= maxYear && date >= minYear;
};
