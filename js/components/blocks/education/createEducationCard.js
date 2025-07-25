import { createElementFromString } from "@/js/func/dom/index.js";
import { Input } from "@/js/components/ui/input.js";
import { HeartSVG } from "@/js/components/ui/svg/heart.js";
import { Button } from "@/js/components/ui/button.js";
import { Textarea } from "@/js/components/ui/textarea.js";
import { maxYear, minYear } from "@/js/func/date/index.js";

export const createEducationCard = () => {
    const educationCard = createElementFromString(`
        <li class="rounded-m education-card invert-input-colors" data-html2canvas-ignore data-date-end="0">
            <div class="flex flex-column education-card__wrapper">
                <div class="flex education-card__duration">
                    <div class="text-s font-medium">
                        <div class="flex duration-inputs" id="edu-inputs">
                            ${Input({
                                type: "number",
                                value: new Date().getFullYear() - 4,
                                max: new Date().getFullYear(),
                                name: "Education duration",
                                id: `edu-duration-start-input`,
                                min: minYear,
                            })}
                        
                            - 
                        
                            ${Input({
                                type: "number",
                                value: new Date().getFullYear(),
                                min: new Date().getFullYear() - 4,
                                name: "Education duration",
                                id: `edu-duration-end-input`,
                                max: maxYear,
                            })}
                        </div>
                    </div>
                    
                    <div id="liked-place">
                        ${HeartSVG()}
                    </div>
                </div>
        
                <div class="flex flex-column spec-and-tags">
                    <div class="font-medium text-s">
                        ${Input({
                            id: `new-education-specialization`,
                            placeholder: "Your specialization",
                            maxLength: 12,
                            value: "",
                        })}
                    </div>
                    
                    <div class="text-s font-regular" id="new-edu-tags-wrp"></div>
                </div>
                
                <div class="font-regular text-s">
                    ${Input({
                        id: `new-education-place`,
                        placeholder: "Where educated",
                        maxLength: 12,
                        value: "",
                    })}
                </div>
            </div>
        </li>
    `);
    const createCardBtn = Button({ text: "Add education", id: "create-edu-card", className: "w-full edit-card" });
    educationCard.appendChild(createCardBtn);

    const newEduTagsWrapper = educationCard.querySelector("#new-edu-tags-wrp");
    const textareaWrapperElement = Textarea({ value: "", placeholder: "Add tags", maxLength: 120, blockEnter: true });

    newEduTagsWrapper.appendChild(textareaWrapperElement);

    return educationCard;
};
