import { Avatar } from "@/js/components/blocks/avatar.js";
import { Greeting } from "@/js/components/blocks/greeting.js";
import { Languages } from "@/js/components/blocks/languages/languages.js";
import { Experience } from "@/js/components/blocks/experience/experience.js";
import { Expertise } from "@/js/components/blocks/expertise/expertise.js";
import { Education } from "@/js/components/blocks/education/education.js";
import { Interests } from "@/js/components/blocks/interests.js";
import { Contacts } from "@/js/components/blocks/contacts.js";

export const MainSection = () => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "main-section grid";
    sectionElement.id = "resume";

    const avatarElement = Avatar("/photo.jpg");
    const introduceElement = Greeting();
    const languagesElement = Languages();
    const experienceElement = Experience();
    const toolsElement = Expertise();
    const educationElement = Education();
    const interestsElement = Interests();
    const contactsElement = Contacts();

    const contactsAndInterestsElement = document.createElement("div");
    contactsAndInterestsElement.className = "contacts-and-interests grid";

    sectionElement.appendChild(avatarElement);
    sectionElement.appendChild(introduceElement);
    sectionElement.appendChild(languagesElement);
    sectionElement.appendChild(experienceElement);
    sectionElement.appendChild(toolsElement);
    sectionElement.appendChild(educationElement);

    contactsAndInterestsElement.appendChild(interestsElement);
    contactsAndInterestsElement.appendChild(contactsElement);

    sectionElement.appendChild(contactsAndInterestsElement);

    return sectionElement;
};
