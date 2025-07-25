export const createElementFromString = htmlString => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString.trim();
    return wrapper.firstElementChild;
};

export const animateOrder = (items, positionsMap) => {
    items.forEach(el => {
        const oldPos = positionsMap.get(el);
        const newPos = el.getBoundingClientRect();

        const dx = oldPos.left - newPos.left;
        const dy = oldPos.top - newPos.top;

        el.style.transition = "none";
        el.style.transform = `translate(${dx}px, ${dy}px)`;

        requestAnimationFrame(() => {
            el.style.transition = "transform .45s ease-in-out";
            el.style.transform = "";
        });
    });
};

export const flyingAnimation = (temp, rootPlace, targetPlace) => {
    const inputRect = rootPlace.getBoundingClientRect();

    temp.style.opacity = 0;
    targetPlace.appendChild(temp);
    const tempRect = temp.getBoundingClientRect();
    targetPlace.removeChild(temp);

    temp.style.opacity = 1;
    const flying = temp.cloneNode(true);
    flying.style.position = "fixed";
    flying.style.top = `${inputRect.top}px`;
    flying.style.left = `${inputRect.left}px`;
    flying.style.margin = 0;
    flying.style.zIndex = 1000;
    flying.style.transition = "all .3s ease-in-out";
    document.body.appendChild(flying);

    requestAnimationFrame(() => {
        flying.style.left = `${tempRect.left}px`;
        flying.style.top = `${tempRect.top}px`;
    });

    flying.addEventListener("transitionend", () => {
        document.body.removeChild(flying);
        targetPlace.appendChild(temp);
    });
};
