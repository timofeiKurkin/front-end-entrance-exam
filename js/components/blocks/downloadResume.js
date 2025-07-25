import { createElementFromString } from "@/js/func/dom/index.js";
import html2pdf from "html2pdf.js";
import { Button } from "@/js/components/ui/button.js";

export const DownloadResume = () => {
    const wrapper = createElementFromString(`
        <div class="flex flex-column download-resume">
            <p class="font-medium text-l">Download resume:</p>
        </div>
    `);

    const downloadButton = Button({ text: "Download", class: "btn" });
    wrapper.appendChild(downloadButton);

    downloadButton.addEventListener("click", () => {
        const resume = document.querySelector("#resume");
        const name = document.querySelector("#grt-name");
        const role = document.querySelector("#grt-role");

        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.left = "-9999px";
        iframe.style.top = "0";
        iframe.style.width = "595px";
        iframe.style.height = "auto";
        iframe.style.visibility = "hidden";
        document.body.appendChild(iframe);

        iframe.contentDocument.open();
        iframe.contentDocument.write(`
            <!DOCTYPE html>
            <html lang="en">
              <head></head>
              <body></body>
            </html>
        `);
        iframe.contentDocument.close();

        const clonedElement = resume.cloneNode(true);
        clonedElement.classList.add("download-resume__resume");
        iframe.contentDocument.body.appendChild(clonedElement);

        const iframeNode = iframe.contentDocument.body.querySelector("#resume");

        setTimeout(() => {
            html2pdf(iframeNode, {
                margin: 0,
                filename:
                    (name.textContent || "Kurkin Timofey") +
                    " - " +
                    (role.textContent || "Frontend Developer") +
                    ".pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { dpi: 300, letterRendering: true, windowWidth: 595, scale: 3, useCORS: true },
                jsPDF: { unit: "pt", format: [595, 842], orientation: "portrait" },
            }).then(() => {
                document.body.removeChild(iframe);
            });
        }, 500);
    });

    return wrapper;
};
