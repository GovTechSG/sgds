// import ClipboardJS from 'clipboard';
import _ from 'lodash';

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

// const clipboard = new ClipboardJS('.btn-copy', {
//     target: trigger => trigger.closest('.code-snippet').querySelector('.highlight')
// });

// clipboard.on('success', function(e) {
//     const copyBtn = e.trigger;
//     const originalText = copyBtn.innerText;
//     copyBtn.innerText = "Copied";
//     _.delay(function(){
//         copyBtn.innerText = originalText;
//     },2000);
//     e.clearSelection();
// });

var tabEl = document.querySelectorAll('button[data-bs-toggle="tab"]')
let currentTab = 'html';
tabEl.forEach(function(el){
    el.addEventListener('shown.bs.tab', function (e) {
    console.log(e.target.attributes[6].nodeValue) // newly activated tab
    currentTab = e.target.attributes[6].nodeValue
    // event.relatedTarget // previous active tab
    })
})

const copyBtn = document.querySelector(".btn-copy");
copyBtn.addEventListener('click', () => {
    console.log(currentTab)
    const originalText = copyBtn.innerText;
    navigator.clipboard.writeText(document.querySelector(".code-" + currentTab).firstChild.textContent)
    .then(() => {
        copyBtn.innerText = "Copied " + currentTab;
        _.delay(function(){
            copyBtn.innerText = originalText;
        },2000);
    })
});