export const parseIntFromString = str => {
    const parsedInt = parseInt(str);
    if (isNaN(parsedInt)) {
        return 0;
    }

    return parsedInt;
};
