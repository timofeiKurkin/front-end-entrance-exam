import { EXPERTISE_DATA_KEY } from "@/js/func/localStorage/keys.js";
import { createElementFromString, flyingAnimation } from "@/js/func/dom/index.js";
import { Input } from "@/js/components/ui/input.js";
import { AddSVG } from "@/js/components/ui/svg/add.js";
import { filterListInPlace } from "@/js/func/data/index.js";
import { setLocalStorageValue } from "@/js/func/localStorage/index.js";
import { Item } from "@/js/components/ui/item.js";

export const expertiseBlock = ({ list, title, id }, index) => {
    const localStorageKey = EXPERTISE_DATA_KEY + "-" + id;

    const expertiseBlockTemplate = createElementFromString(`
        <li class="expertise flex flex-column rounded-s">
            <p class="text-xs font-medium expertise__title rounded-xl">${title.toLowerCase()}</p>
                
            <ul class="flex expertise__list" id="expertise-items-${index}"></ul>
            
            <div class="flex expertise__create font-regular text-s" data-html2canvas-ignore>
                ${Input({
                    id: `new-expertise-item-${index}`,
                    placeholder: title,
                    maxLength: 12,
                    value: "",
                })}
                    
                <div class="pointer" id="add-expertise-item-${index}">${AddSVG()}</div>
            </div>
        </li>
    `);

    const expertiseItems = expertiseBlockTemplate.querySelector("#expertise-items-" + index);

    const removeExpertiseItem = e => {
        filterListInPlace(list, e.target.textContent);
        setLocalStorageValue(localStorageKey, { id, title, list });

        e.target.style.transition = "opacity 0.2s ease-in-out";
        e.target.style.opacity = 0;

        setTimeout(() => {
            e.target.remove();
        }, 200);
    };

    list.forEach(skill => {
        expertiseItems.appendChild(
            Item({
                text: skill,
                className: "expertise-item rounded-s font-medium text-s",
                onClick: removeExpertiseItem,
                tag: "li",
            })
        );
    });

    const newExpertiseItem = expertiseBlockTemplate.querySelector("#new-expertise-item-" + index);
    const addToolBtn = expertiseBlockTemplate.querySelector("#add-expertise-item-" + index);

    addToolBtn.addEventListener("click", () => {
        if (newExpertiseItem && newExpertiseItem.value) {
            list.push(newExpertiseItem.value);

            const temp = Item({
                text: newExpertiseItem.value,
                className: "expertise-item rounded-s font-medium text-s",
                onClick: removeExpertiseItem,
                tag: "li",
            });

            flyingAnimation(temp, newExpertiseItem, expertiseItems);

            setLocalStorageValue(localStorageKey, { title, list, id });
            newExpertiseItem.value = "";
        }
    });

    return expertiseBlockTemplate;
};
