import { gsap } from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import ClipboardJS from 'clipboard';

// import Shuffle from 'shufflejs';

// gsap.registerPlugin(ScrollTrigger);
// gsap.to(".sgds.navbar",{
//     scrollTrigger: {
//         trigger: ".sgds.navbar",
//         start: "10px top",
//         scrub: 1
//     },
//     backgroundColor: "rgba(244, 246, 250, 0.6)",
//     backdropFilter: "blur(10px)",
//     duration: 0.35
// });

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

const clipboard = new ClipboardJS('.btn-copy', {
    target: trigger => trigger.closest('.code-snippet').querySelector('.highlight')
})

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});