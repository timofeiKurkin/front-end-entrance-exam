import data from "@/data/expertise.json";
import { createElementFromString } from "@/js/func/dom/index.js";
import { getListOfValuesOrDefault } from "@/js/func/localStorage/index.js";
import { EXPERTISE_DATA_KEY } from "@/js/func/localStorage/keys.js";
import { expertiseBlock } from "@/js/components/blocks/expertise/expertiseBlock.js";

export const Expertise = () => {
    const expertiseData = getListOfValuesOrDefault(EXPERTISE_DATA_KEY, data.tools);

    const expertiseRoot = createElementFromString(`
        <div class="flex flex-column block-wrapper rounded-xl expertise">
            <h2 class="font-medium text-xl">Expertise</h2>
            
            <ul class="flex flex-column expertise__list" id="expertise-list"></ul>
        </div>
    `);

    const expertiseList = expertiseRoot.querySelector("#expertise-list");
    if (expertiseList) {
        expertiseData.forEach((item, index) => {
            expertiseList.appendChild(expertiseBlock(item, index));
        });
    }

    // if (expertiseList) {
    //     expertiseList.appendChild(createExpertiseBlock());
    // }

    return expertiseRoot;
};
