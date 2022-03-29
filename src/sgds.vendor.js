import { gsap } from 'gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
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