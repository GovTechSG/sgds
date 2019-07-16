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

    // Accordion
    if ($(".sgds-accordion-set > a").length) {
        let anchors = $(".sgds-accordion-set > a").get();
        anchors.forEach(anchor => {
            $(anchor).on("click", function() {
                if ($(this).hasClass("active")) {
                    $(this)
                        .removeClass("active")
                        .attr("aria-expanded", false);
                    $(this)
                        .siblings(".sgds-accordion-body")
                        .slideUp(300);
                    $(this)
                        .children("i")
                        .removeClass("sgds-icon-chevron-up")
                        .addClass("sgds-icon-chevron-down");
                } else {
                    let otherAnchorsInSet = $(this)
                        .parent()
                        .siblings(".sgds-accordion-set")
                        .children("a");
                    if (otherAnchorsInSet) {
                        otherAnchorsInSet
                            .children("i")
                            .removeClass("sgds-icon-chevron-up")
                            .addClass("sgds-icon-chevron-down");
                        otherAnchorsInSet.removeClass("active");
                        otherAnchorsInSet
                            .siblings(".sgds-accordion-body")
                            .slideUp(300);
                    }

                    $(this)
                        .addClass("active")
                        .attr("aria-expanded", true);
                    $(this)
                        .children("i")
                        .removeClass("sgds-icon-chevron-down")
                        .addClass("sgds-icon-chevron-up");
                    $(this)
                        .siblings(".sgds-accordion-body")
                        .slideDown(300);
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
                    if (
                        tabAnchor.parentElement.classList.contains("is-active")
                    ) {
                        return;
                    }

                    tabAnchor.parentElement.classList.add("is-active");
                    let tabTargetToShow = document.querySelector(
                        tabAnchor.dataset.tab
                    );
                    sgds.show(tabTargetToShow);

                    let parentListItemSiblings = sgds.getSiblings(
                        tabAnchor.parentElement
                    );
                    if (parentListItemSiblings.length > 0) {
                        parentListItemSiblings.forEach(listItem => {
                            listItem.classList.remove("is-active");
                            let itemTabAnchor = listItem.querySelector(
                                "a[data-tab]"
                            );
                            let itemTabTarget = document.querySelector(
                                itemTabAnchor.dataset.tab
                            );
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
    const dropdowns = document.querySelectorAll(
        ".sgds-dropdown:not(.is-hoverable)"
    );
    if (dropdowns.length > 0) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener("click", event => {
                event.stopPropagation(); // Stop close listeners
                dropdown.classList.toggle("is-active");
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
            let sideNavMenuList = sideNavMain.querySelector(
                ".sidebar__inner.sgds-menu"
            );
            if (sideNavMenuList) {
                new StickySidebar(".sidenav", {
                    containerSelector: ".sidenav-container",
                    innerWrapperSelector: ".sidebar__inner",
                    topSpacing: Number.parseInt(sideNavMain.dataset.topspacing),
                    bottomSpacing: Number.parseInt(
                        sideNavMain.dataset.bottomspacing
                    )
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
