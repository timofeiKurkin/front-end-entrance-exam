export const Input = ({
    value,
    id,
    type = "text",
    placeholder = "Enter value",
    maxLength = 100,
    tabIndex = 0,
    min,
    max,
    step,
    name = "Input",
    className = "",
}) => {
    if (type === "month" || type === "number") {
        return `
            <input class="input-date rounded-s ${className}" value="${value}" type="${type}" min="${min || "0"}" max="${max || "1"}" id=${id} name="${name}" tabindex="${tabIndex}"/>
        `;
    }

    if (type === "range") {
        return `
            <input class="input-range w-full ${className}" value=${value} type="${type}" min="${min || "0"}" max="${max || "1"}" id=${id} name="${name}" tabindex="${tabIndex}" step="${step || "0.1"}"/>
        `;
    }

    return `
        <input class="input w-full rounded-s ${className}" value="${value}" type="${type}" min="${min || "0"}" max="${max || "1"}" placeholder="${placeholder}" id=${id} name="${name}" maxlength="${maxLength}" tabindex="${tabIndex}"/>
    `;
};
