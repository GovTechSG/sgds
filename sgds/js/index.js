import "../sass/sgds.scss";
import "../fonts/sgds-icons.svg";
import "../fonts/sgds-icons.ttf";
import "../fonts/sgds-icons.woff";

const { jQuery } = window;
if (!jQuery) {
  throw new Error(
    "SGDS couldn't initialize; please make sure jQuery is loaded!"
  );
}
const $ = jQuery;

$(document).ready(() => {
  // Search bar toggle
  const searchToggles = $(".search-toggle");
  for (let i = 0; i < searchToggles.length; i++) {
    let searchToggle = searchToggles[i];
    let searchToggleTargetId = searchToggle.dataset.target;
    let searchToggleTarget = $(`#${searchToggleTargetId}`);

    let searchIcon = $(searchToggle).children("span");
    let searchBarInput = $(searchToggleTarget).find("input");

    $(searchToggle).click(() => {
      searchIcon.toggleClass("sgds-icon-search").toggleClass("sgds-icon-cross");
      searchToggleTarget.toggleClass("hide");
      searchBarInput.focus().val("");
    });
  }

  // Accordions, non-set
  const accordions = $(".sgds-accordion").not(
    ".sgds-accordion-set > .sgds-accordion"
  );
  if (accordions) {
    for (let i = 0; i < accordions.length; i++) {
      let accordion = accordions[i];
      let accordionHeader = $(accordion).children(".sgds-accordion-header");
      let accordionBody = $(accordion).children(".sgds-accordion-body");
      $(accordionHeader).click(event => {
        let header = $(event.target);
        if ($(header).hasClass("is-active")) {
          $(header)
            .removeClass("is-active")
            .attr("aria-expanded", false)
            .children("i")
            .removeClass("sgds-icon-chevron-up")
            .addClass("sgds-icon-chevron-down");
          $(accordionBody).slideUp(300);
        } else {
          $(header)
            .addClass("is-active")
            .attr("aria-expanded", true)
            .children("i")
            .removeClass("sgds-icon-chevron-down")
            .addClass("sgds-icon-chevron-up");
          $(accordionBody).slideDown(300);
        }
      });
    }
  }

  const accordionSetAccordions = $(".sgds-accordion-set > .sgds-accordion");
  if (accordionSetAccordions.length) {
    let headers = $(".sgds-accordion-set .sgds-accordion-header");
    for (let i = 0; i < headers.length; i++) {
      let header = headers.eq(i);
      header.click(function() {
        if (header.hasClass("is-active")) {
          header.removeClass("is-active").attr("aria-expanded", false);
          header.siblings(".sgds-accordion-body").slideUp(300);
          header
            .children("i")
            .removeClass("sgds-icon-chevron-up")
            .addClass("sgds-icon-chevron-down");
        } else {
          let otherHeadersInSet = header
            .parent()
            .siblings(".sgds-accordion")
            .children(".sgds-accordion-header");
          if (otherHeadersInSet) {
            otherHeadersInSet
              .children("i")
              .removeClass("sgds-icon-chevron-up")
              .addClass("sgds-icon-chevron-down");
            otherHeadersInSet.removeClass("is-active");
            otherHeadersInSet
              .siblings(".sgds-accordion-body")
              .slideUp(300)
              .removeClass("is-open");
          }
          header.addClass("is-active").attr("aria-expanded", true);
          header
            .children("i")
            .removeClass("sgds-icon-chevron-down")
            .addClass("sgds-icon-chevron-up");
          header
            .siblings(".sgds-accordion-body")
            .slideDown(300)
            .addClass("is-open");
        }
      });
    }
  }

  // Tabs
  const tabs = $(".sgds-tabs");
  if (tabs && tabs.length > 0) {
    for (let i = 0; i < tabs.length; i++) {
      let tabElement = tabs.eq(i);
      let tabAnchors = tabElement.find("a[data-tab]");
      tabAnchors.each(function(index, tabAnchor) {
        let ta = $(tabAnchor);
        let parentLi = ta.parent();
        let tabTarget = document.querySelector(tabAnchor.dataset.tab);
        // On init, hide all other non-active tabs
        if (!parentLi.hasClass("is-active")) {
          $(tabTarget).hide();
        }
        // On click, show tab target and hide others
        ta.click(() => {
          if (parentLi.hasClass("is-active")) {
            return;
          }
          parentLi.addClass("is-active");
          $(tabTarget).show();
          let parentLiSiblings = parentLi.siblings();
          if (parentLiSiblings.length > 0) {
            parentLiSiblings.each(function(index, liElement) {
              let $le = $(liElement);
              $le.removeClass("is-active");
              let siblingTabAnchor = $le.find("a[data-tab]");
              let siblingTabTarget = $(siblingTabAnchor.attr("data-tab"));
              siblingTabTarget.hide();
            });
          }
        });
      });
    }
  }

  // Navbar burger menus
  const navbarBurgers = $(".sgds-navbar-burger");
  if (navbarBurgers.length > 0) {
    navbarBurgers.each(function(index, burger) {
      $(burger).click(function() {
        const targetMenuId = burger.dataset.target;
        const targetMenu = document.getElementById(targetMenuId);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        burger.classList.toggle("is-active");
        targetMenu.classList.toggle("is-active");
      });
    });
  }
  const oldNavbarBurgers = $(".navbar-burger");
  if (oldNavbarBurgers.length > 0) {
    oldNavbarBurgers.each(function(index, burger) {
      $(burger).click(function() {
        const targetMenuId = burger.dataset.target;
        const targetMenu = document.getElementById(targetMenuId);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        burger.classList.toggle("is-active");
        targetMenu.classList.toggle("is-active");
      });
    });
  }

  // Dropdowns
  const dropdowns = $(".sgds-dropdown:not(.is-hoverable)");
  if (dropdowns.length > 0) {
    dropdowns.each((i, dropdown) => {
      let dropdownTrigger = dropdown.querySelector(".sgds-dropdown-trigger");
      dropdownTrigger.addEventListener("click", event => {
        event.stopPropagation(); // Stop close listeners
        dropdown.classList.toggle("is-active");
        let dropdownIcon = dropdownTrigger.querySelector(".sgds-icon");

        if (dropdown.classList.contains("is-active")) {
          dropdownIcon.classList.remove("sgds-icon-chevron-down");
          dropdownIcon.classList.add("sgds-icon-chevron-up");
        } else {
          dropdownIcon.classList.remove("sgds-icon-chevron-up");
          dropdownIcon.classList.add("sgds-icon-chevron-down");
        }
      });
    });

    document.addEventListener("click", event => {
      dropdowns.each((i, dropdown) => {
        if (!dropdown.contains(event.target)) {
          dropdown.classList.remove("is-active");
        }
        let dropdownIcon = dropdown.querySelector(".sgds-button .sgds-icon");
        if (dropdownIcon) {
          dropdownIcon.classList.remove("sgds-icon-chevron-up");
          dropdownIcon.classList.add("sgds-icon-chevron-down");
        }
      });
    });

    // Close dropdowns if ESC pressed
    document.addEventListener("keydown", event => {
      const e = event || window.event;
      if (e.keyCode === 27) {
        dropdowns.each((i, dropdown) => {
          dropdown.classList.remove("is-active");
          let dropdownIcon = dropdown.querySelector(".sgds-button .sgds-icon");
          if (dropdownIcon) {
            dropdownIcon.classList.remove("sgds-icon-chevron-up");
            dropdownIcon.classList.add("sgds-icon-chevron-down");
          }
        });
      }
    });
  }

  if (document.querySelector("li.second-level-nav")) {
    initSecondLevelNavInteraction();
  }

  // Language Selector
  let languageSelectors = $(".language-selector");
  if (languageSelectors.length) {
    languageSelectors.each((i, languageSelector) => {
      let langSelectorTarget = $("#" + languageSelector.dataset.target);
      $(languageSelector).click(() => {
        langSelectorTarget.toggle();
      });
      document.addEventListener("click", event => {
        if (!languageSelector.contains(event.target)) {
          langSelectorTarget.hide();
        }
      });
    });
  }
});

function initSecondLevelNavInteraction() {
  let secondLevelNavHeaderArray = document.querySelectorAll(
    "li.second-level-nav"
  );
  for (let index = 0; index < secondLevelNavHeaderArray.length; index++) {
    // Check if next element is third-level-nav
    let navHeader = secondLevelNavHeaderArray[index];
    let nextEl = navHeader.nextElementSibling;
    if (nextEl && nextEl.classList.contains("second-level-nav-div")) {
      navHeader.addEventListener("click", event => {
        let navIcon = navHeader.querySelector("i");
        if (nextEl.classList.contains("is-hidden")) {
          nextEl.classList.remove("is-hidden");
          if (navIcon) {
            navIcon.classList.remove("sgds-icon-chevron-down");
            navIcon.classList.add("sgds-icon-chevron-up");
          }
        } else {
          nextEl.classList.add("is-hidden");
          if (navIcon) {
            navIcon.classList.remove("sgds-icon-chevron-up");
            navIcon.classList.add("sgds-icon-chevron-down");
          }
        }
      });
    }
  }

  var secondLevelNavHeaderMobileArray = document.querySelectorAll(
    "a.second-level-nav-header-mobile"
  );

  for (var index = 0; index < secondLevelNavHeaderMobileArray.length; index++) {
    function secondLevelNavMobileClosure() {
      var closureIndex = index;
      function toggleSecondLevelNavMobileDiv() {
        // Get the icon of the second-level-nav-header
        var secondLevelNavMobileIcon = secondLevelNavHeaderMobileArray[
          closureIndex
        ].getElementsByTagName("I")[0];
        var secondLevelMobileDiv = document.getElementsByClassName(
          "second-level-nav-div-mobile"
        )[closureIndex];
        if (secondLevelMobileDiv.classList.contains("is-hidden")) {
          secondLevelNavMobileIcon.classList.remove("sgds-icon-chevron-down");
          secondLevelNavMobileIcon.classList.add("sgds-icon-chevron-up");
          secondLevelMobileDiv.classList.remove("is-hidden");
        } else {
          secondLevelMobileDiv.classList.add("is-hidden");
          secondLevelNavMobileIcon.classList.remove("sgds-icon-chevron-up");
          secondLevelNavMobileIcon.classList.add("sgds-icon-chevron-down");
        }
      }
      return toggleSecondLevelNavMobileDiv;
    }

    secondLevelNavHeaderMobileArray[index].addEventListener(
      "click",
      secondLevelNavMobileClosure()
    );
  }
}
