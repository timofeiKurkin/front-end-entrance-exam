import { createElementFromString } from "@/js/func/dom/index.js";

export const Button = ({ text, className = "", style = "" }) => {
    const button = createElementFromString(`
        <button class="btn text-s font-medium ${className}" style="${style}">
            <span id="btn-content">${text}</span>
        </button>
    `);

    button.addEventListener("click", e => {
        const currentBtn = e.currentTarget;

        const ripple = currentBtn.querySelector(".ripple");
        if (ripple) {
            e.stopPropagation();
            ripple.remove();
        }

        const circle = document.createElement("span");
        const diameter = Math.max(currentBtn.clientWidth, currentBtn.clientHeight);
        const radius = diameter / 2;

        const rect = currentBtn.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");

        currentBtn.appendChild(circle);
    });

    return button;
};
