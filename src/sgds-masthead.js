export function sgdsMasthead(){
    const identify = document.getElementById("sgds-masthead-identify");
    const identifyIcon = document.getElementById("sgds-masthead-identify-icon");
    const mastheadContent = document.getElementById("sgds-masthead-content");
    const mastheadDivider = document.getElementById("sgds-masthead-divider");

    identify.setAttribute("aria-expanded", false);
    identify.addEventListener("click", () => {
        const ariaExpanded = identify.getAttribute("aria-expanded");
        if (ariaExpanded === "true") {

            identify.setAttribute("aria-expanded", false);
        }
        else {
            identify.setAttribute("aria-expanded", true);
        }
        identifyIcon.classList.toggle("sgds-icon-chevron-up");
        mastheadContent.classList.toggle("is-hidden");
        mastheadDivider.classList.toggle("is-hidden");

    });
}