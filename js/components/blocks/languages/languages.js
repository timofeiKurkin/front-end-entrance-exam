import { Input } from "@/js/components/ui/input.js";
import { getValueOrSetDefault, setLocalStorageValue } from "@/js/func/localStorage/index.js";
import { LANG_DATA_KEY } from "@/js/func/localStorage/keys.js";
import data from "@/data/languages.json";
import { Button } from "@/js/components/ui/button.js";
import { languageItem } from "@/js/components/blocks/languages/languageItem.js";

export const Languages = () => {
    const langData = getValueOrSetDefault(LANG_DATA_KEY, data.languages);

    const wrapper = document.createElement("div");

    const levelsTemplate = langData.map((item, index) => languageItem(item, index, langData));

    wrapper.innerHTML = `
        <div class="flex flex-column languages block-wrapper rounded-xl">
            <h2 class="font-medium text-xl">Languages</h2>
            
            <ul class="flex flex-column languages__list" id="lang-list"></ul>
            
            <div class="grid languages__new-lang" data-html2canvas-ignore>
                ${Input({ id: `new-lang-title`, placeholder: "Language", maxLength: 12, value: "" })}
                ${Input({ id: `new-lang-level`, type: "range", min: 0, max: 1, value: 0, step: 0.01 })}
            </div>
        </div>
    `.trim();

    const langList = wrapper.querySelector("#lang-list");
    levelsTemplate.forEach(lang => {
        langList.appendChild(lang);
    });

    const newLangWrapper = wrapper.querySelector(".languages__new-lang");
    const addLangBtn = Button({ text: "Add" });
    newLangWrapper.appendChild(addLangBtn);

    const newLangTitle = wrapper.querySelector("#new-lang-title");
    const newLangLevel = wrapper.querySelector("#new-lang-level");

    addLangBtn.addEventListener("click", () => {
        if (!newLangTitle.value || langData.length >= 4) {
            return;
        }

        langData.push({ title: newLangTitle.value, level: parseFloat(newLangLevel.value).toFixed(2) });
        setLocalStorageValue(LANG_DATA_KEY, langData);

        newLangTitle.value = "";
        newLangLevel.value = 0;

        const n = langData.length - 1;
        const newLangElement = languageItem(langData[n], n, langData);
        langList.appendChild(newLangElement);
    });

    return wrapper.firstChild;
};
