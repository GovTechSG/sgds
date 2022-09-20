import ClipboardJS from "clipboard";
import _ from "lodash";
// import { default as $ } from "../apps/src/lib/jQuery";

// $(document).ready(function () {
//     initializeComponentFilter();
// });

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

const clipboard = new ClipboardJS(".btn-copy", {
    target: (trigger) =>
        trigger.closest(".code-snippet").querySelector(".highlight"),
});

clipboard.on("success", function (e) {
    const copyBtn = e.trigger;
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Copied";
    _.delay(function () {
        copyBtn.innerText = originalText;
    }, 2000);
    e.clearSelection();
});

// function initializeComponentFilter() {
//     if (document.getElementById("search-field")) {
//         var options = {
//             valueNames: ["component-name"],
//         };
//         var componentList = new List("standard-component", options);
//         var componentList1 = new List("layouts-component", options);
//         var componentList2 = new List("general-component", options);

//         var eventTarget = document.getElementById("search-field");

//         eventTarget.addEventListener("input", function () {
//             var searchString = eventTarget.value;
//             componentList.search(searchString);
//             componentList1.search(searchString);
//             componentList2.search(searchString);
//         });
//     }
// }
