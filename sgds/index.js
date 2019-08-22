import StickySidebar from "sticky-sidebar";
import { jQuery as $ } from "./js/lib";
import sgds from "./js/sgds";
import { initSecondLevelNavInteraction } from "./js/sgds-sidenav";
import "./sass/sgds.scss";
import "./fonts/sgds-icons.svg";
import "./fonts/sgds-icons.ttf";
import "./fonts/sgds-icons.woff";

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
            $(searchIcon)
                .toggleClass("sgds-icon-search")
                .toggleClass("sgds-icon-cross");
            $(searchToggleTarget).toggleClass("hide");
            $(searchBarInput)
                .focus()
                .val("");
        });
    }

    // Accordions, non-set
    const accordions = $(".sgds-accordion").not(".sgds-accordion-set > .sgds-accordion");
    if (accordions) {
        for (let accordion of accordions) {
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

    if ($(".sgds-accordion-set > .sgds-accordion").length) {
        let headers = $(".sgds-accordion-set .sgds-accordion-header").get();
        headers.forEach(header => {
            $(header).on("click", function() {
                if ($(this).hasClass("is-active")) {
                    $(this)
                        .removeClass("is-active")
                        .attr("aria-expanded", false);
                    $(this)
                        .siblings(".sgds-accordion-body")
                        .slideUp(300);
                    $(this)
                        .children("i")
                        .removeClass("sgds-icon-chevron-up")
                        .addClass("sgds-icon-chevron-down");
                } else {
                    let otherHeadersInSet = $(this)
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

                    $(this)
                        .addClass("is-active")
                        .attr("aria-expanded", true);
                    $(this)
                        .children("i")
                        .removeClass("sgds-icon-chevron-down")
                        .addClass("sgds-icon-chevron-up");
                    $(this)
                        .siblings(".sgds-accordion-body")
                        .slideDown(300)
                        .addClass("is-open");
                }
            });
        });
    }

    // Tabs
    const tabs = $(".sgds-tabs");
    if (tabs && tabs.length > 0) {
        for (let i = 0; i < tabs.length; i++) {
            let tabElement = tabs[i];
            let tabAnchors = tabElement.querySelectorAll("a[data-tab]");

            for (let j = 0; j < tabAnchors.length; j++) {
                let tabAnchor = tabAnchors[j];
                let tabTarget = document.querySelector(tabAnchor.dataset.tab);
                if (!sgds.hasClass(tabAnchor.parentNode, "is-active")) {
                    sgds.hide(tabTarget);
                }
                // Attach toggle listeners
                tabAnchor.addEventListener("click", event => {
                    if (tabAnchor.parentElement.classList.contains("is-active")) {
                        return;
                    }

                    tabAnchor.parentElement.classList.add("is-active");
                    let tabTargetToShow = document.querySelector(tabAnchor.dataset.tab);
                    sgds.show(tabTargetToShow);

                    let parentListItemSiblings = sgds.getSiblings(tabAnchor.parentElement);
                    if (parentListItemSiblings.length > 0) {
                        parentListItemSiblings.forEach(listItem => {
                            listItem.classList.remove("is-active");
                            let itemTabAnchor = listItem.querySelector("a[data-tab]");
                            let itemTabTarget = document.querySelector(itemTabAnchor.dataset.tab);
                            sgds.hide(itemTabTarget);
                        });
                    }
                });
            }
        }
    }

    // Navbar burger menus
    const navbarBurgers = document.querySelectorAll(".navbar-burger");
    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(function(burger) {
            burger.addEventListener("click", function() {
                const targetMenuId = burger.dataset.target;
                const targetMenu = document.getElementById(targetMenuId);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                burger.classList.toggle("is-active");
                targetMenu.classList.toggle("is-active");
            });
        });
    }

    // Dropdowns
    const dropdowns = document.querySelectorAll(".sgds-dropdown:not(.is-hoverable)");
    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
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

        document.addEventListener("click", () => {
            dropdowns.forEach(function($el) {
                $el.classList.remove("is-active");
            });
        });

        // Close dropdowns if ESC pressed
        document.addEventListener("keydown", event => {
            const e = event || window.event;
            if (e.keyCode === 27) {
                dropdowns.forEach(function($el) {
                    $el.classList.remove("is-active");
                });
            }
        });
    }

    // Needs hierarchy: .sidenav-container > .sidenav > .sidebar__inner.sgds-menu
    let sideNavContainer = document.querySelector(".sidenav-container");
    if (sideNavContainer) {
        let sideNavMain = sideNavContainer.querySelector(".sidenav");
        if (sideNavMain) {
            let sideNavMenuList = sideNavMain.querySelector(".sidebar__inner.sgds-menu");
            if (sideNavMenuList) {
                new StickySidebar(".sidenav", {
                    containerSelector: ".sidenav-container",
                    innerWrapperSelector: ".sidebar__inner",
                    topSpacing: Number.parseInt(sideNavMain.dataset.topspacing),
                    bottomSpacing: Number.parseInt(sideNavMain.dataset.bottomspacing)
                });
            }
        }
    }

    if (document.querySelector("li.second-level-nav")) {
        initSecondLevelNavInteraction();
    }

    // Language Selector
    if ($(".language_selector").length) {
        var language_selector = $(".language_selector");
        language_selector.click(function() {
            $(".language_selector--dropdown").toggle();
        });
        $(".language_selector--dropdown li").click(function() {
            $(".language_selector--dropdown").toggle();
        });
    }

    // Notifications
    let notifications = sgds.getElements("notification");
    if (notifications && notifications.length > 0) {
        for (let i = 0, len = notifications.length; i < len; i++) {
            notification = notifications[i];
            options = sgds.parseOptions(notification);
            sgds.notification(notification, "hide", options);
        }
    }
});
