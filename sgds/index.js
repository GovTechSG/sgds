import StickySidebar from "sticky-sidebar";
import { jQuery as $ } from "./js/lib";
import sgds from "./js/sgds";
import { initSecondLevelNavInteraction } from "./js/sgds-sidenav";
import "./sass/sgds.scss";

if (!sgds.isReady) {
    menuElems = sgds.getElements("menu");
    if (menuElems && menuElems.length > 0) {
        for (let i = 0, len = menuElems.length; i < len; i++) {
            menu = menuElems[i];
            options = sgds.parseOptions(menu);
            lists = menu.querySelectorAll(".sgds-menu-list");
            for (j = 0, len1 = lists.length; j < len1; j++) {
                list = lists[j];
                subMenu = list.querySelector("ul");
                if (subMenu) {
                    sgds.toggleMenu(subMenu.previousElementSibling, options);
                }
            }
        }
    }
}

if (!sgds.isReady) {
    modals = sgds.getElements("sgds-modal");
    if (modals && modals.length > 0) {
        for (let i = 0, len = modals.length; i < len; i++) {
            modal = modals[i];
            options = sgds.parseOptions(modal);
            sgds.toggleModal(modal, options);
        }
    }
}

if (!sgds.isReady) {
    notifications = sgds.getElements("notification");
    if (notifications && notifications.length > 0) {
        for (let i = 0, len = notifications.length; i < len; i++) {
            notification = notifications[i];
            options = sgds.parseOptions(notification);
            sgds.notification(notification, "hide", options);
        }
    }
}

function addAccordionClickListener(el) {
    let anchor = $(el);
    anchor.on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
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
                otherAnchorsInSet.siblings(".sgds-accordion-body").slideUp(300);
            }

            $(this).addClass("active");
            $(this)
                .children("i")
                .removeClass("sgds-icon-chevron-down")
                .addClass("sgds-icon-chevron-up");
            $(this)
                .siblings(".sgds-accordion-body")
                .slideDown(300);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Search bar toggle
    const masthead_container = $(".masthead-container");
    const searchIcon = $("#search-activate span");
    const searchBar = $(".search-bar");
    const searchBar_input = $(".search-bar input");
    const searchToggle = $("#search-activate");
    searchToggle.on("click", function(e) {
        e.preventDefault();
        searchIcon
            .toggleClass("sgds-icon-search")
            .toggleClass("sgds-icon-cross");
        searchBar.toggleClass("hide");
        searchBar_input.focus().val("");
        masthead_container.toggleClass("is-opened");
    });

    // Accordion
    if ($(".sgds-accordion-set > a").length) {
        let anchors = $(".sgds-accordion-set > a").get();
        anchors.forEach(anchor => {
            addAccordionClickListener(anchor);
        });
    }

    // Tabs
    const tabs = sgds.getElements("tabs");
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
        navbarBurgers.forEach(function($el) {
            $el.addEventListener("click", function() {
                const targetMenuId = $el.dataset.target;
                const targetMenu = document.getElementById(targetMenuId);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle("is-active");
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

    // Sticky sidebar - fixed
    if ($(".sidenav").length) {
        const sidenav = $(".sidenav");
        new StickySidebar(".sidenav", {
            containerSelector: ".has-side-nav",
            innerWrapperSelector: ".sidebar__inner",
            topSpacing: sidenav.data("topspacing"),
            bottomSpacing: sidenav.data("bottomspacing")
        });
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
});

export default {
    addAccordionClickListener
};
