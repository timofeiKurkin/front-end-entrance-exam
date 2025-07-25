import { EDUCATION_DATA_KEY } from "@/js/func/localStorage/keys.js";
import { createElementFromString } from "@/js/func/dom/index.js";
import { formatDate, maxYear, minYear, validateYear } from "@/js/func/date/index.js";
import { HeartSVG } from "@/js/components/ui/svg/heart.js";
import { Input } from "@/js/components/ui/input.js";
import { Button } from "@/js/components/ui/button.js";
import { setLocalStorageValue } from "@/js/func/localStorage/index.js";
import { Textarea } from "@/js/components/ui/textarea.js";
import { parseIntFromString } from "@/js/func/parse/index.js";

export const educationCard = ({ id, duration, place, specialization, tags, liked }, toSort) => {
    const localStorageKey = EDUCATION_DATA_KEY + "-" + id;

    const wrapper = createElementFromString(`
        <li class="rounded-m education-card" data-date-end="${duration.end}">
            <div class="front active-side flex flex-column education-card__wrapper">
                <div class="flex education-card__duration">
                    <p class="text-s font-medium" id="edu-duration-${id}">${formatDate(duration.start, duration.end)}</p>
                    
                    <div class="like-education pointer sm-hg-sm" id="like-edu-${id}">
                        ${HeartSVG()}
                    </div>
                </div>
                
                <div class="flex flex-column spec-and-tags">
                    <p class="font-medium text-s break-word" id="edu-specialization-${id}">${specialization}</p>
                    
                    <p class="text-s font-regular education-tags-list break-word" id="edu-tags-${id}">${tags.filter(Boolean).join(" ")}</p>
                </div>
                
                <p class="font-regular text-s break-word" id="edu-place-${id}">${place}</p>
            </div>
            
            <div class="back flex flex-column education-card__wrapper invert-input-colors">
                <div class="flex education-card__duration text-s font-medium">
                    <div class="grid duration-inputs">
                        ${Input({
                            type: "number",
                            value: duration.start || 0,
                            max: duration.end,
                            name: "Education duration",
                            id: `edu-duration-start-input-${id}`,
                            min: minYear,
                        })}
                        
                         - 
                        
                        ${Input({
                            type: "number",
                            value: duration.end,
                            min: duration.start || 0,
                            name: "Education duration",
                            id: `edu-duration-end-input-${id}`,
                            max: maxYear,
                        })}
                    </div>
                </div>
                
                <div class="flex flex-column spec-and-tags">
                    <div class="font-medium text-s">
                        ${Input({
                            value: specialization,
                            id: `edu-specialization-input-${id}`,
                            maxLength: 50,
                            placeholder: "Your specialization",
                        })}
                    </div>
                    
                    <div id="edu-edit-tags-${id}"></div>
                </div>
                
                <div class="font-regular text-s">
                    ${Input({
                        value: place,
                        id: `edu-place-input-${id}`,
                        maxLength: 30,
                        placeholder: "Where educated",
                    })}
                </div>
            </div>
        </li>
    `);

    const frontCard = wrapper.querySelector(".front");
    const backCard = wrapper.querySelector(".back");

    const editCardBtn = Button({ text: "Change", id: `edu-edit-card-${id}`, className: "w-full edit-card" });
    editCardBtn.setAttribute("data-html2canvas-ignore", "true");
    wrapper.appendChild(editCardBtn);

    const likeEdu = wrapper.querySelector(`#like-edu-${id}`);
    if (liked) {
        wrapper.classList.add("education-liked");
        likeEdu.classList.add("liked-education");
    }

    likeEdu.addEventListener("click", () => {
        likeEdu.style.animation = "sm-hg-sm 300ms ease";

        liked = !liked;
        likeEdu.classList.toggle("liked-education", liked);
        wrapper.classList.toggle("education-liked", liked);

        setLocalStorageValue(localStorageKey, { id, duration, place, specialization, tags, liked });

        likeEdu.addEventListener(
            "animationend",
            () => {
                likeEdu.style.animation = "";
            },
            { once: true }
        );
    });

    let isChanging = false;

    const eduSpecialization = wrapper.querySelector("#edu-specialization-" + id);
    const eduSpecializationInput = wrapper.querySelector("#edu-specialization-input-" + id);

    const eduTags = wrapper.querySelector("#edu-tags-" + id);
    const eduTagsWrapper = wrapper.querySelector("#edu-edit-tags-" + id);
    const eduTagsTextarea = Textarea({
        value: tags.join(" "),
        placeholder: "Add tags",
        maxLength: 120,
        blockEnter: true,
        className: "text-s font-regular",
    });
    eduTagsWrapper.appendChild(eduTagsTextarea);

    const eduPlace = wrapper.querySelector("#edu-place-" + id);
    const eduPlaceInput = wrapper.querySelector("#edu-place-input-" + id);
    const durationElement = wrapper.querySelector("#edu-duration-" + id);

    const durationInputStart = wrapper.querySelector(`#edu-duration-start-input-${id}`);
    const durationInputEnd = wrapper.querySelector(`#edu-duration-end-input-${id}`);

    durationInputStart.addEventListener("change", e => {
        durationInputEnd.min = e.target.value;
    });

    durationInputEnd.addEventListener("change", e => {
        durationInputStart.max = e.target.value;
    });

    const handleVisibility = isChanging => {
        wrapper.classList.toggle("education-liked", isChanging && liked);
        frontCard.classList.toggle("active-side");
        backCard.classList.toggle("active-side");

        editCardBtn.querySelector("#btn-content").textContent = !isChanging ? "Save" : "Change";
    };

    const handleEditMode = () => {
        let endDataChanged = false;

        if (isChanging) {
            let isChanged = false;

            const parsedStartDuration = parseIntFromString(durationInputStart.value);
            if (parsedStartDuration && validateYear(parsedStartDuration) && parsedStartDuration !== duration.start) {
                duration.start = parsedStartDuration;
                durationElement.textContent = formatDate(duration.start, duration.end);
                isChanged = true;
            } else {
                durationInputStart.value = duration.start || 0;
            }

            const parsedEndDuration = parseIntFromString(durationInputEnd.value);
            if (parsedEndDuration && validateYear(parsedEndDuration) && parsedEndDuration !== duration.end) {
                duration.end = parsedEndDuration;
                durationElement.textContent = formatDate(duration.start, duration.end);
                isChanged = true;
                endDataChanged = true;
                wrapper.dataset.dateEnd = duration.end.toString();
            } else {
                durationInputEnd.value = duration.end;
            }

            if (eduSpecializationInput.value && eduSpecializationInput.value !== specialization) {
                specialization = eduSpecializationInput.value;
                eduSpecialization.textContent = eduSpecializationInput.value;
                isChanged = true;
            } else {
                eduSpecializationInput.value = specialization;
            }

            const textarea = eduTagsTextarea.querySelector("textarea");
            const cleanTags = textarea.value.split(" ").filter(Boolean).join(" ");
            if (cleanTags && cleanTags !== eduTags.textContent) {
                eduTags.textContent = cleanTags;
                tags = cleanTags.split(" ");
                isChanged = true;
            } else {
                textarea.value = tags.join(" ");
            }

            if (eduPlaceInput.value && eduPlaceInput.value !== place) {
                place = eduPlaceInput.value;
                eduPlace.textContent = eduPlaceInput.value;
                isChanged = true;
            } else {
                eduPlaceInput.value = place;
            }

            if (isChanged) {
                setLocalStorageValue(EDUCATION_DATA_KEY + "-" + id, {
                    id,
                    duration,
                    place,
                    specialization,
                    tags,
                    liked,
                });
            }
        }

        handleVisibility(isChanging);

        if (endDataChanged) {
            setTimeout(() => toSort(), 250);
        }

        isChanging = !isChanging;
    };

    editCardBtn.addEventListener("click", handleEditMode);

    document.addEventListener("click", e => {
        if (!wrapper.contains(e.target) && isChanging) {
            handleVisibility(isChanging);

            durationInputStart.value = duration.start;
            durationInputEnd.value = duration.end;
            eduSpecializationInput.value = eduSpecialization.textContent;
            eduPlaceInput.value = eduPlace.textContent;

            const textarea = eduTagsTextarea.querySelector("textarea");
            textarea.value = tags.join(" ");

            isChanging = false;
        }
    });

    return wrapper;
};
