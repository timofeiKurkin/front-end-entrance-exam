import { createElementFromString } from "@/js/func/dom/index.js";
import { Input } from "@/js/components/ui/input.js";
import { Textarea } from "@/js/components/ui/textarea.js";

export const createExpertiseBlock = () => {
    const expertiseForm = createElementFromString(`
        <li class="new-expertise flex flex-column rounded-s">
            <div>
                ${Input({ id: `expertise-title`, placeholder: "Expertise title", maxLength: 12, value: "" })}
            </div>

            <div class="" id="new-expertise-items"></div>

            <button class="btn" id="create-expertise">Create</button>
        </li>
    `);

    const textarea = Textarea({
        id: "expertise-items-textarea",
        placeholder: "Items separated by space",
        maxLength: 12,
        value: "",
    });

    const textareaWrapper = expertiseForm.querySelector("#new-expertise-items");
    if (textareaWrapper) {
        textareaWrapper.appendChild(textarea);
    }

    const createExpertiseBtn = expertiseForm.querySelector("#create-expertise");
    createExpertiseBtn.addEventListener("click", () => {
        // if (textarea)
    });

    return expertiseForm;
};
