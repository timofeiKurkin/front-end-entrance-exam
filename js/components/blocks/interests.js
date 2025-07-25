import data from "@/data/interests.json";
import { getValueOrSetDefault, setLocalStorageValue } from "@/js/func/localStorage/index.js";
import { Input } from "@/js/components/ui/input.js";
import { INTERESTS_DATA_KEY } from "@/js/func/localStorage/keys.js";
import { Item } from "@/js/components/ui/item.js";
import { filterListInPlace } from "@/js/func/data/index.js";
import { Button } from "@/js/components/ui/button.js";

export const Interests = () => {
    const interestsData = getValueOrSetDefault(INTERESTS_DATA_KEY, data.interests);
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
        <div class="interests flex flex-column rounded-xl block-wrapper">
        
            <div class="flex flex-column interests__wrapper">
                <h2 class="font-medium text-xl">Interests</h2>
                
                <ul class="flex interests__list" id="interests-list"></ul>
            </div>
            
            <div class="grid create-interest font-regular text-s" data-html2canvas-ignore>
                ${Input({
                    id: `new-interest`,
                    placeholder: "Your interest",
                    maxLength: 50,
                    value: "",
                })}
            </div>
        </div>
    `.trim();

    const createInterest = wrapper.querySelector(".create-interest");
    const createInterestBtn = Button({ text: "Add" });
    createInterest.appendChild(createInterestBtn);

    const addInterestInput = wrapper.querySelector("#new-interest");

    const interestsList = wrapper.querySelector("#interests-list");

    const removeInterest = e => {
        filterListInPlace(interestsData, e.target.textContent);
        setLocalStorageValue(INTERESTS_DATA_KEY, interestsData);

        e.target.remove();
    };

    interestsData.forEach(interest => {
        interestsList.appendChild(
            Item({
                text: interest,
                className: "interest text-s rounded-xl pointer",
                onClick: removeInterest,
            })
        );
    });

    createInterestBtn.addEventListener("click", () => {
        if (addInterestInput.value) {
            interestsData.push(addInterestInput.value);
            setLocalStorageValue(INTERESTS_DATA_KEY, interestsData);

            interestsList.appendChild(
                Item({
                    text: addInterestInput.value,
                    className: "interest text-s rounded-xl pointer",
                    onClick: removeInterest,
                })
            );
            addInterestInput.value = "";
        }
    });

    return wrapper.firstChild;
};
