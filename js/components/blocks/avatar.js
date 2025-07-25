export const Avatar = (src, alt = "avatar") => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.className = "avatar rounded-xl block w-full";

    return img;
};
