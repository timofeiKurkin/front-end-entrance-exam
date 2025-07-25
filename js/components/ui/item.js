export const Item = ({ text, className, id, tag = "li", onClick }) => {
    const item = document.createElement(tag);
    if (className) {
        item.className = className;
    }

    if (id) {
        item.id = id;
    }

    item.textContent = text;
    item.addEventListener("click", onClick);

    return item;
};
