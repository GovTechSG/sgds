import { gsap } from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
// import Shuffle from 'shufflejs';

gsap.registerPlugin(ScrollTrigger);
gsap.to(".sgds.navbar",{
    scrollTrigger: {
        trigger: ".sgds.navbar",
        start: "10px top",
        scrub: 1
    },
    backgroundColor: "rgba(244, 246, 250, 0.6)",
    backdropFilter: "blur(10px)",
    duration: 0.35
});

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
