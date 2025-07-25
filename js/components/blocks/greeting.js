import data from "@/data/greeting.json";
import { getValueOrSetDefault, setLocalStorageValue } from "@/js/func/localStorage/index.js";
import { createElementFromString } from "@/js/func/dom/index.js";
import { GREETING_DATA_KEY } from "@/js/func/localStorage/keys.js";
import { PenSVG } from "@/js/components/ui/svg/pen.js";
import { AcceptSVG } from "@/js/components/ui/svg/accept.js";
import { Input } from "@/js/components/ui/input.js";
import { Textarea } from "@/js/components/ui/textarea.js";

export const Greeting = () => {
    let greetingData = getValueOrSetDefault(GREETING_DATA_KEY, data);

    if (!greetingData.name || !greetingData.role) {
        greetingData = data;
    }

    const wrapper = createElementFromString(`
        <div class="greeting flex flex-column block-wrapper rounded-xl" id="grt">
            <div class="flex greeting-header">
                <p class="font-medium text-l">Hello 👋🏻 I’m</p>
            
                <div class="pointer" id="grt-edit" data-html2canvas-ignore>
                    <span id="grt-pen">${PenSVG(28)}</span>
                    <span id="grt-accept" style="display: none;">${AcceptSVG(28)}</span>
                </div>
            </div>
    
            <div>
                <div class="front active-side">
                    <div class="greeting__wrapper flex flex-column">
                        <p class="text-xl font-semibold greeting-content" id="grt-name">${greetingData.name}</p>
                        
                        <p class="text-l font-medium greeting-content" id="grt-role">${greetingData.role}</p>
                    </div>
                </div>
                <div class="back">
                    <div class="greeting__wrapper flex flex-column">
                        <div id="grt-name-wrp"></div>
                        
                        <div class="text-l font-medium">
                            ${Input({
                                value: greetingData.role,
                                id: "grt-rule-input",
                                placeholder: "Your role",
                                maxLength: 30,
                                tabIndex: 2,
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    let isChanging = false;

    const frontSide = wrapper.querySelector(".front");
    const backSide = wrapper.querySelector(".back");

    const pen = wrapper.querySelector("#grt-pen");
    const accept = wrapper.querySelector("#grt-accept");

    const name = wrapper.querySelector("#grt-name");
    const role = wrapper.querySelector("#grt-role");

    const nameTextareaWrapper = wrapper.querySelector("#grt-name-wrp");
    const nameTextarea = Textarea({
        value: greetingData.name,
        id: "grt-name-input",
        placeholder: "Your name",
        maxLength: 30,
        tabIndex: 2,
        blockEnter: true,
        className: "text-xl font-semibold",
    });
    nameTextareaWrapper.appendChild(nameTextarea);

    const roleInput = wrapper.querySelector("#grt-rule-input");

    const editGreeting = wrapper.querySelector("#grt-edit");

    const saveChanges = () => {
        let dataChanged = false;

        const newName = nameTextarea.querySelector("textarea");
        if (newName.value && newName.value !== greetingData.name) {
            greetingData.name = newName.value;
            name.textContent = newName.value;
            dataChanged = true;
        } else {
            newName.value = greetingData.name;
        }

        if (roleInput.value && roleInput.value !== greetingData.role) {
            greetingData.role = roleInput.value;
            role.textContent = roleInput.value;
            dataChanged = true;
        } else {
            roleInput.value = greetingData.role;
        }

        if (dataChanged) {
            setLocalStorageValue(GREETING_DATA_KEY, greetingData);
        }
    };

    const handleEditMode = () => {
        if (isChanging) {
            saveChanges();
        }

        pen.style.display = !isChanging ? "none" : "block";
        accept.style.display = !isChanging ? "block" : "none";

        frontSide.classList.toggle("active-side");
        backSide.classList.toggle("active-side");

        isChanging = !isChanging;
    };

    editGreeting.addEventListener("click", handleEditMode);

    document.addEventListener("click", e => {
        if (!wrapper.contains(e.target) && isChanging) {
            handleEditMode();
        }
    });

    return wrapper;
};
