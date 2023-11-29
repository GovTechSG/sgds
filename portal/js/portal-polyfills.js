import _ from 'lodash';
import * as bootstrap from 'bootstrap';

// For Components Tooltip page , required to trigger tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// For Portal navbar, code snippet copy button and tabs
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");
document.addEventListener("devConsoleWidgetToggle", function (event) {
    const widgetState = event.detail.isWidgetOpen;
    // Widget is open
    if (widgetState) {
        navbarToggler.setAttribute("aria-expanded", false)
        navbarCollapse.classList.remove("show");
    }
});

const copyBtn = document.querySelector(".btn-copy");
copyBtn.addEventListener('click', () => {
    const originalText = copyBtn.innerText;
    const htmlCodeSnippet = document.querySelector("sgds-tab-panel[name=html]>.highlight").textContent
    navigator.clipboard.writeText(htmlCodeSnippet)
    .then(() => {
        copyBtn.innerText = "Copied";
        _.delay(function(){
            copyBtn.innerText = originalText;
        },2000);
    })
});
