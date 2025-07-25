import data from "@/data/education.json";
import { sortByDates } from "@/js/func/date/index.js";
import { animateOrder, createElementFromString } from "@/js/func/dom/index.js";
import { getListOfValuesOrDefault } from "@/js/func/localStorage/index.js";
import { EDUCATION_DATA_KEY } from "@/js/func/localStorage/keys.js";
import { educationCard } from "@/js/components/blocks/education/educationCard.js";

export const Education = () => {
    const educationData = getListOfValuesOrDefault(EDUCATION_DATA_KEY, data.education);

    const wrapper = createElementFromString(`
        <div class="education flex flex-column rounded-xl block-wrapper">
            <h2 class="font-medium text-xl">Education</h2>
            
            <ul class="education__list grid" id="education-list"></ul>
        </div>
    `);

    const sortEduData = () => {
        educationData.sort((a, b) => sortByDates(a.duration.end, b.duration.end));
    };

    const educationList = wrapper.querySelector("#education-list");

    const toSort = () => {
        sortEduData();

        const educationCards = Array.from(educationList.querySelectorAll(".education-card"));

        const positions = new Map();
        educationCards.forEach(card => {
            positions.set(card, card.getBoundingClientRect());
        });

        const sortedEducationCards = educationCards.sort((a, b) => sortByDates(a.dataset.dateEnd, b.dataset.dateEnd));

        for (const item of sortedEducationCards) {
            educationList.appendChild(item);
        }

        animateOrder(sortedEducationCards, positions);
    };

    sortEduData();
    const educationTemplate = educationData.map(item => educationCard(item, toSort));

    educationTemplate.forEach(item => {
        educationList.appendChild(item);
    });
    // educationList.appendChild(createEducationCard());

    return wrapper;
};
