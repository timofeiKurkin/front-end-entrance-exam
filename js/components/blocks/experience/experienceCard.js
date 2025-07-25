import { Input } from "@/js/components/ui/input.js";
import { createElementFromString } from "@/js/func/dom/index.js";
import { formatMonthLabel } from "@/js/func/date/index.js";
import { Textarea } from "@/js/components/ui/textarea.js";
import { Button } from "@/js/components/ui/button.js";
import { setLocalStorageValue } from "@/js/func/localStorage/index.js";
import { EXPERIENCE_DATA_KEY } from "@/js/func/localStorage/keys.js";

export const experienceCard = ({ id, duration, position, company, points }, index, toSort) => {
    const startDateTemplate = Input({
        type: "month",
        value: duration.start || "",
        max: duration.end || "",
        id: "wp-start-date-" + index,
        name: "Start date in work",
        className: "font-medium text-s",
    });

    const endDateTemplate = Input({
        type: "month",
        value: duration.end || "",
        min: duration.start || "",
        id: "wp-end-date-" + index,
        name: "End date in work",
        className: "font-medium text-s",
    });

    const workPlaceElement = createElementFromString(`
        <li class="rounded-m work-place text-s" data-date-end="${duration.end}">
            <div class="front active-side flex flex-column work-place__wrapper">
                <p class="font-medium text-s">
                    <span id="wp-final-start-date-${index}">${formatMonthLabel(duration.start)}</span>
                    -
                    <span id="wp-final-end-date-${index}">${formatMonthLabel(duration.end)}</span>
                </p>
                
                <div class="grid work-place__info invert-input-colors">
                    <div class="grid position-info h-full">
                        <p class="break-word font-medium text-md" id="wp-position-${index}">${position}</p>
                            
                        <p class="break-word font-regular text-s" id="wp-company-${index}">${company}</p>
                    </div>
                        
                    <ul class="font-regular text-s flex flex-column work-place-points" id="wp-points-list-${index}">
                        ${points.map(point => `<li class="break-word">${point}</li>`).join("")}
                    </ul>
                </div>
            
            </div>
            
            <div class="back flex flex-column work-place__wrapper">
                <div class="flex work-place__date-inputs">${startDateTemplate} - ${endDateTemplate}</div>
                
                <div class="grid work-place__info invert-input-colors">
                    <div class="grid position-info h-full" id="wp-edit-position-info-${index}">
                        ${Input({
                            value: company,
                            id: "wp-company-ipt-" + index,
                            name: "Company input",
                            className: "font-regular text-s",
                            maxLength: 40,
                        })}
                        
                        <div class="flex flex-column edit-work-place w-full" data-html2canvas-ignore></div>
                    </div>
                        
                    <div class="h-full" id="wp-points-${index}"></div>
                </div>
            
            </div>
        </li>
    `);

    // Elements where to insert components
    const frontCard = workPlaceElement.querySelector(".front");
    const backCard = workPlaceElement.querySelector(".back");
    const positionInfoWrapper = workPlaceElement.querySelector(".position-info");
    const editWorkPlaceBack = workPlaceElement.querySelector(".edit-work-place");
    const workPlacePoints = workPlaceElement.querySelector("#wp-points-" + index);
    const editPositionInfo = workPlaceElement.querySelector("#wp-edit-position-info-" + index);

    const companyInput = workPlaceElement.querySelector("#wp-company-ipt-" + index);
    const positionTextareaWrapper = Textarea({
        id: "wp-position-textarea-" + index,
        placeholder: "Position in company",
        maxLength: 40,
        blockEnter: true,
        value: position,
        className: "font-medium text-md",
    });
    editPositionInfo.insertBefore(positionTextareaWrapper, companyInput);

    const pointsTextareaWrapper = Textarea({
        id: "wp-points-textarea-" + index,
        placeholder: "What you did there?",
        maxLength: 1500,
        value: points.join("\n"),
        className: "font-regular text-s",
    });
    if (workPlacePoints) {
        workPlacePoints.appendChild(pointsTextareaWrapper);
    }

    // Text Content
    const workPlaceFormatDateStart = workPlaceElement.querySelector("#wp-final-start-date-" + index);
    const workPlaceFormatDateEnd = workPlaceElement.querySelector("#wp-final-end-date-" + index);
    const workPlacePointsList = workPlaceElement.querySelector("#wp-points-list-" + index);
    const companyElement = workPlaceElement.querySelector("#wp-company-" + index);
    const positionElement = workPlaceElement.querySelector("#wp-position-" + index);

    const startDateInput = workPlaceElement.querySelector("#wp-start-date-" + index);
    const endDateInput = workPlaceElement.querySelector("#wp-end-date-" + index);
    startDateInput.addEventListener("change", e => {
        endDateInput.min = e.target.value;
    });
    endDateInput.addEventListener("change", e => {
        startDateInput.max = e.target.value;
    });

    // Buttons to edit card
    const editCardBtn = Button({ text: "Edit", className: "w-full self-end" });
    editCardBtn.setAttribute("data-html2canvas-ignore", "true");
    positionInfoWrapper.appendChild(editCardBtn);

    const cancelEditCardBtn = Button({
        text: "Cancel",
        className: "w-full cancel-btn",
    });
    cancelEditCardBtn.setAttribute("data-html2canvas-ignore", "true");

    const saveEditCardBtn = Button({ text: "Save", id: `edu-edit-card-${id}`, className: "w-full edit-card" });
    saveEditCardBtn.setAttribute("data-html2canvas-ignore", "true");

    editWorkPlaceBack.appendChild(cancelEditCardBtn);
    editWorkPlaceBack.appendChild(saveEditCardBtn);

    const updateVisibility = () => {
        frontCard.classList.toggle("active-side");
        backCard.classList.toggle("active-side");
    };

    let isChanging = false;

    editCardBtn.addEventListener("click", () => {
        updateVisibility();
        isChanging = true;
    });

    saveEditCardBtn.addEventListener("click", () => {
        if (!isChanging) {
            return;
        }

        let endDataChanged = false;
        let dataChanged = false;

        const pointsTextarea = pointsTextareaWrapper.querySelector("textarea");
        const clearPoints = pointsTextarea.value.split("\n").filter(Boolean);

        if (clearPoints.length && clearPoints.join("") !== points.join("")) {
            pointsTextareaWrapper.dataset.replicatedValue = clearPoints.join("\n");
            points = clearPoints;
            const elementPoints = workPlacePointsList.querySelectorAll("li");
            const elementPointsLength = elementPoints.length;

            elementPoints.forEach((point, index) => {
                if (index >= points.length) {
                    point.remove();
                } else if (point.textContent !== points[index]) {
                    point.textContent = points[index];
                }
            });

            if (points.length > elementPointsLength) {
                points.slice(elementPointsLength).forEach(point => {
                    const newPoint = document.createElement("li");
                    newPoint.className = "font-regular text-s";
                    newPoint.textContent = point;
                    workPlacePointsList.appendChild(newPoint);
                });
            }

            dataChanged = true;
        } else {
            pointsTextarea.value = points.join("\n");
            pointsTextareaWrapper.dataset.replicatedValue = points.join("\n");
        }

        if (duration.start !== startDateInput.value) {
            duration.start = startDateInput.value;
            workPlaceFormatDateStart.textContent = formatMonthLabel(startDateInput.value);
            dataChanged = true;

            endDateInput.min = startDateInput.value;
        }

        if (duration.end !== endDateInput.value) {
            duration.end = endDateInput.value;
            workPlaceFormatDateEnd.textContent = formatMonthLabel(endDateInput.value);
            dataChanged = true;

            workPlaceElement.dataset.dateEnd = duration.end;
            endDataChanged = true;

            startDateInput.max = endDateInput.value;
        }

        if (companyInput.value && company !== companyInput.value) {
            companyElement.textContent = company = companyInput.value;
            dataChanged = true;
        } else {
            companyInput.value = company;
        }

        const positionTextarea = positionTextareaWrapper.querySelector("textarea");
        if (positionTextarea.value && position !== positionTextarea.value) {
            positionElement.textContent = position = positionTextarea.value;
            dataChanged = true;
        } else {
            positionTextarea.value = position;
        }

        if (dataChanged) {
            setLocalStorageValue(EXPERIENCE_DATA_KEY + "-" + id, { id, duration, position, company, points });
        }

        if (endDataChanged) {
            setTimeout(() => toSort(), 400);
        }

        updateVisibility();
        isChanging = false;
    });

    const resetInputs = () => {
        companyInput.value = company;
        positionTextareaWrapper.querySelector("textarea").value = position;
        pointsTextareaWrapper.querySelector("textarea").value = points.filter(Boolean).join("\n");

        startDateInput.value = duration.start;
        endDateInput.value = duration.end;
    };

    cancelEditCardBtn.addEventListener("click", () => {
        updateVisibility();
        isChanging = false;
        resetInputs();
    });

    document.addEventListener("click", e => {
        if (!workPlaceElement.contains(e.target) && isChanging) {
            updateVisibility();
            isChanging = false;
            resetInputs();
        }
    });

    return workPlaceElement;
};
