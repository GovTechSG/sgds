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

//Home / Components / ** 
const copyBtn = document.querySelector(".btn-copy");
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const originalText = copyBtn.innerText;
        const htmlCodeSnippet = document.querySelector("sgds-tab-panel[name=html]>.highlight").textContent
        navigator.clipboard.writeText(htmlCodeSnippet)
            .then(() => {
                copyBtn.innerText = "Copied";
                _.delay(function () {
                    copyBtn.innerText = originalText;
                }, 2000);
            })
    });
}

// Home / Foundation / Colour 
const colorItem = gsap.utils.toArray('.color-items:not(.theme-color-grid) > .color-item');
if (colorItem) {
    colorItem.forEach(el => {
        let ani = gsap.timeline({
            paused: true,
            defaults: {
                ease: "power1.out",
            }
        }
        );
        ani.to(el, 0.15, { width: "+=10" })
            .staggerFrom([el.children[1], el.children[2], el.children[3]], 0.15, { autoAlpha: 0, y: "+=10", stagger: 0.1 }, "-0.15")
        el.addEventListener('mouseover', () => ani.play());
        el.addEventListener('mouseout', () => ani.reverse());
    })
};


