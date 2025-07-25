import data from "@/data/experience.json";
import { sortByDates } from "@/js/func/date/index.js";
import { animateOrder, createElementFromString } from "@/js/func/dom/index.js";
import { getListOfValuesOrDefault } from "@/js/func/localStorage/index.js";
import { EXPERIENCE_DATA_KEY } from "@/js/func/localStorage/keys.js";
import { experienceCard } from "@/js/components/blocks/experience/experienceCard.js";

export const Experience = () => {
    const experienceData = getListOfValuesOrDefault(EXPERIENCE_DATA_KEY, data.experience);

    const experienceRoot = createElementFromString(`
        <div class="experience flex flex-column block-wrapper rounded-xl">
            <h2 class="font-medium text-xl">Experience</h2>
            
            <ul class="flex flex-column experience__list" id="experience-list"></ul>
        </div>
    `);

    const experienceList = experienceRoot.querySelector("#experience-list");
    experienceData.sort((a, b) => sortByDates(a.duration.end, b.duration.end));

    const toSort = () => {
        experienceData.sort((a, b) => sortByDates(a.duration.end, b.duration.end));

        const workPlaces = Array.from(experienceList.querySelectorAll(".work-place"));

        const positions = new Map();
        workPlaces.forEach(el => {
            positions.set(el, el.getBoundingClientRect());
        });

        const sortedWorkPlaces = workPlaces.sort((a, b) => sortByDates(a.dataset.dateEnd, b.dataset.dateEnd));

        for (const item of sortedWorkPlaces) {
            if (item.classList.contains("recent-work-place")) {
                item.classList.remove("recent-work-place");
            }

            experienceList.appendChild(item);
        }

        experienceList.firstChild.classList.toggle("recent-work-place");

        animateOrder(sortedWorkPlaces, positions);
    };

    experienceData
        .map((item, index) => experienceCard(item, index, toSort))
        .forEach(item => {
            experienceList.appendChild(item);
        });

    experienceList.firstChild.classList.toggle("recent-work-place");

    return experienceRoot;
};
