import _ from "lodash";
/** do not import for entry point to prevent clashing in js scripts */
import Tooltip  from "bootstrap/js/src/tooltip";
import Dropdown from "bootstrap/js/src/dropdown"

const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new Dropdown(dropdownToggleEl))
// // For Components Tooltip page , required to trigger tooltip
const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
);

// For Portal navbar, code snippet copy button and tabs
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");
document.addEventListener("devConsoleWidgetToggle", function (event) {
    const widgetState = event.detail.isWidgetOpen;
    // Widget is open
    if (widgetState) {
        navbarToggler.setAttribute("aria-expanded", false);
        navbarCollapse.classList.remove("show");
    }
});

const copyBtn = document.querySelector(".btn-copy");
copyBtn.addEventListener("click", () => {
    const originalText = copyBtn.innerText;
    const htmlCodeSnippet = document.querySelector(
        "sgds-tab-panel[name=html]>.highlight"
    ).textContent;
    navigator.clipboard.writeText(htmlCodeSnippet).then(() => {
        copyBtn.innerText = "Copied";
        _.delay(function () {
            copyBtn.innerText = originalText;
        }, 2000);
    });
});
