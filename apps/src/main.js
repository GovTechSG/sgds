import StickySidebar from "sticky-sidebar";

import { default as $ } from "./lib/jQuery";

$(document).ready(() => {
  initializeStickySidebar();
});

function initializeStickySidebar() {
  // Needs hierarchy: .sidenav-container > .sidenav > .sidebar__inner.sgds-menu
  let sideNavContainer = document.querySelector(".sidenav-container");
  if (sideNavContainer) {
    let sideNavMain = sideNavContainer.querySelector(".sidenav");
    if (sideNavMain) {
      let sideNavMenuList = sideNavMain.querySelector(
        ".sidebar__inner.sgds-menu"
      );
      if (sideNavMenuList) {
        new StickySidebar(".sidenav", {
          containerSelector: ".sidenav-container",
          innerWrapperSelector: ".sidebar__inner",
          topSpacing: parseInt(sideNavMain.dataset.topspacing),
          bottomSpacing: parseInt(sideNavMain.dataset.bottomspacing)
        });
      }
    }
  }
}
