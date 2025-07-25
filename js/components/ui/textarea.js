import { createElementFromString } from "@/js/func/dom/index.js";

export const Textarea = ({
    value = "",
    id,
    placeholder = "Enter value",
    maxLength = 100,
    blockEnter = false,
    className = "",
    tabIndex,
}) => {
    const wrapper = createElementFromString(`
        <div class="textarea-grow-wrap ${className}">
            <textarea class="textarea w-full rounded-s" placeholder="${placeholder}" id=${id} maxlength="${maxLength}" tabindex="${tabIndex}" onInput="this.parentNode.dataset.replicatedValue = this.value">${value}</textarea>
        </div>
    `);

    wrapper.dataset.replicatedValue = value;

    if (blockEnter) {
        wrapper.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        });
    }

    return wrapper;
};
