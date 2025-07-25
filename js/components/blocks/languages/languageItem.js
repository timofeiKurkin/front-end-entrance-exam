import { createElementFromString } from "@/js/func/dom/index.js";
import { Input } from "@/js/components/ui/input.js";
import { CancelSVG } from "@/js/components/ui/svg/cancel.js";
import { setLocalStorageValue } from "@/js/func/localStorage/index.js";
import { LANG_DATA_KEY } from "@/js/func/localStorage/keys.js";

export const languageItem = (lang, index, langData) => {
    const wrapper = createElementFromString(`
        <li class="flex lang-progress">
            <div class="grid lang-progress__wrapper w-full">
                <p class="font-medium text-md">${lang.title}</p>
                <div class="h-full">
                    ${Input({
                        type: "range",
                        id: `lang-range-${index}`,
                        min: 0,
                        max: 1,
                        value: lang.level,
                        step: 0.01,
                    })}
                    
                    <div class="lang-progress__level h-full w-full rounded-s" style="width: ${lang.level * 100}%" id="lang-range-final-${index}"></div>
                </div>
            </div>
            
            <span class="pointer" id="lang-progress-rmv-${index}" data-html2canvas-ignore>${CancelSVG()}</span>
        </li>
    `);

    const langProgressRmv = wrapper.querySelector("#lang-progress-rmv-" + index);
    if (langProgressRmv) {
        const removeLangProgress = () => {
            wrapper.removeEventListener("click", removeLangProgress);
            setLocalStorageValue(
                LANG_DATA_KEY,
                langData.filter(item => item.title !== lang.title)
            );

            wrapper.remove();
        };
        langProgressRmv.addEventListener("click", removeLangProgress);
    }

    const langRangeFinal = wrapper.querySelector(`#lang-range-final-${index}`);
    const langRange = wrapper.querySelector(`#lang-range-${index}`);
    langRange.classList.add("lang-progress__range");
    langRange.addEventListener("change", e => {
        langData[index].level = parseFloat(e.target.value).toFixed(2);
        langRangeFinal.style.width = `${langData[index].level * 100}%`;
        setLocalStorageValue(LANG_DATA_KEY, langData);
    });

    return wrapper;
};
