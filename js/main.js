import "@/css/style.css";
import "@/css/fonts.css";
import "@/css/reset.css";
import "@/css/variables.css";
import "@/css/utilities.css";
import "@/css/input.css";
import "@/css/scrollbar.css";
import "@/css/button.css";
import "@/css/animations.css";

import { MainSection } from "@/js/components/section/root.js";
import { DownloadResume } from "@/js/components/blocks/downloadResume.js";

document.querySelector("#app").appendChild(DownloadResume());
document.querySelector("#app").appendChild(MainSection());
