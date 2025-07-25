export const filterListInPlace = (list, target) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === target) {
            list.splice(i, 1);
            break;
        }
    }
};
