import data from "@/data/contacts.json";
import { Textarea } from "@/js/components/ui/textarea.js";
import { PenSVG } from "@/js/components/ui/svg/pen.js";
import { AcceptSVG } from "@/js/components/ui/svg/accept.js";
import { createElementFromString } from "@/js/func/dom/index.js";
import { getValueOrSetDefault, setLocalStorageValue } from "@/js/func/localStorage/index.js";
import { CONTACTS_DATA_KEY } from "@/js/func/localStorage/keys.js";

export const Contacts = () => {
    const contactsData = getValueOrSetDefault(CONTACTS_DATA_KEY, data);

    const wrapper = createElementFromString(`
        <div class="contacts rounded-xl block-wrapper">
            <div class="front active-side flex flex-column contacts__wrapper">
                <h2 class="contacts__content font-medium text-xl text-wrap" id="contacts-phrase">${contactsData.content}</h2>
                <a href="mailto:${contactsData.email}" class=" link font-regular text-md">${contactsData.email}</a>
                <a href="${contactsData.github}" target="_blank" class="link font-regular text-md">${contactsData.github.replace("https://", "")}</a>
                
                <span class="contacts__controls pointer" data-html2canvas-ignore id="grt-pen">${PenSVG(28)}</span>
            </div>
            
            <div class="back flex flex-column contacts__wrapper">
                <div class="font-medium text-xl" id="contacts-edit-phrase"></div>
                
                <a href="mailto:${contactsData.email}" class=" link font-regular text-md">${contactsData.email}</a>
                <a href="${contactsData.github}" target="_blank" class="link font-regular text-md">${contactsData.github.replace("https://", "")}</a>
                
                <span class="contacts__controls pointer" data-html2canvas-ignore id="grt-accept">${AcceptSVG(28)}</span>
            </div>
        </div>
    `);

    const frontSide = wrapper.querySelector(".front");
    const backSide = wrapper.querySelector(".back");

    const contactsPhrase = wrapper.querySelector("#contacts-phrase");
    const contactsEditPhrase = wrapper.querySelector("#contacts-edit-phrase");
    const textareaWrapperElement = Textarea({
        value: contactsData.content,
        blockEnter: true,
        id: "contacts-phrase-edit",
        maxLength: 75,
    });
    contactsEditPhrase.appendChild(textareaWrapperElement);

    const pen = wrapper.querySelector("#grt-pen");
    const accept = wrapper.querySelector("#grt-accept");

    const handleVisibility = () => {
        frontSide.classList.toggle("active-side");
        backSide.classList.toggle("active-side");
    };

    let isChanging = false;

    pen.addEventListener("click", () => {
        if (isChanging) {
            return;
        }

        handleVisibility();
        isChanging = true;
    });

    accept.addEventListener("click", () => {
        if (!isChanging) {
            return;
        }

        if (isChanging) {
            const textareaElement = textareaWrapperElement.querySelector("textarea");
            if (textareaElement.value && textareaElement.value !== contactsData.content) {
                contactsData.content = textareaElement.value;
                contactsPhrase.textContent = contactsData.content;

                setLocalStorageValue(CONTACTS_DATA_KEY, contactsData);
            } else {
                textareaElement.value = contactsData.content;
            }
        }

        handleVisibility();

        isChanging = false;
    });

    document.addEventListener("click", e => {
        if (!wrapper.contains(e.target) && isChanging) {
            handleVisibility();
        }
    });

    return wrapper;
};
