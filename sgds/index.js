import { jQuery as $ } from "./js/lib";
import StickySidebar from "sticky-sidebar";
import { initSecondLevelNavInteraction } from "./js/sgds-sidenav";
import sgds from "./js/sgds";
import "./sass/sgds.scss";

var i, j, len, len1, list, lists, menu, menuElems, options, subMenu;

sgds.toggleMenu = function(el, options) {
    sgds.collapseMenu(el, "hide");
    sgds.click(el, function(e) {
        var active, actives, i, len;
        e.preventDefault();
        e.stopPropagation();
        if (options.single) {
            actives = menu.querySelectorAll(".is-active");
            for (i = 0, len = actives.length; i < len; i++) {
                active = actives[i];
                if (active !== e.target) {
                    sgds.removeClass(active, "is-active");
                    if (active.nextElementSibling.nodeName === "UL") {
                        sgds.hide(active.nextElementSibling);
                    }
                }
            }
        }
        sgds.collapseMenu(e.target, "toggle");
    });
};

sgds.collapseMenu = function(el, status) {
    var smenu;
    smenu = el.nextElementSibling;
    if (status === "show") {
        sgds.show(smenu);
        if (sgds.isVisible(smenu)) {
            return sgds.addClass(el, "is-active");
        }
    } else if (status === "hide") {
        sgds.hide(smenu);
        if (!sgds.isVisible(smenu)) {
            return sgds.removeClass(el, "is-active");
        }
    } else if (status === "toggle") {
        sgds.toggle(smenu);
        if (sgds.isVisible(smenu)) {
            return sgds.addClass(el, "is-active");
        } else {
            return sgds.removeClass(el, "is-active");
        }
    }
};

if (!sgds.isReady) {
    menuElems = sgds.getElements("menu");
    if (menuElems && menuElems.length > 0) {
        for (i = 0, len = menuElems.length; i < len; i++) {
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
var i, len, modal, modals, options;

sgds.toggleModal = function(el, options) {
    if (!options.target) {
        throw new Error("Found [sgds-MODAL] but there is no target defined!");
    }
    el.addEventListener("click", function(e) {
        var backdrop, closeBtn, closeModal, modal;
        e.preventDefault();
        e.stopPropagation();
        modal = document.getElementById(options.target);
        backdrop = modal.querySelector(".sgds-modal-background");
        closeBtn = modal.querySelector(".sgds-modal-close");
        closeModal = function() {
            if (sgds.hasClass(modal, "is-active")) {
                sgds.removeClass(modal, "is-active");
                return sgds.unclick(this, closeModal);
            }
        };
        if (options.closeByBackdrop === void 0 || options.closeByBackdrop) {
            sgds.click(backdrop, closeModal);
        }
        if (options.closeByButton === void 0 || options.closeByButton) {
            sgds.click(closeBtn, closeModal);
        }
        sgds.addClass(modal, "is-active");
    });
};

if (!sgds.isReady) {
    modals = sgds.getElements("sgds-modal");
    if (modals && modals.length > 0) {
        for (i = 0, len = modals.length; i < len; i++) {
            modal = modals[i];
            options = sgds.parseOptions(modal);
            sgds.toggleModal(modal, options);
        }
    }
}
var i, len, notification, notifications, options;

sgds.notification = function(el, status, options) {
    var deleteBtn, deleteNotification;
    if (options.deletable === void 0 || options.deletable !== false) {
        deleteBtn = el.querySelector(".delete");
        deleteNotification = function(e) {
            e.preventDefault();
            e.stopPropagation();
            el.parentNode.removeChild(el);
        };
    }
    if (status === "show") {
        sgds.removeClass(el, "is-hidden");
        sgds.click(deleteBtn, deleteNotification);
    } else if (status === "hide") {
        sgds.addClass(el, "is-hidden");
    } else if (status === "toggle") {
        if (sgds.isVisible(el)) {
            sgds.notification(el, "hide", options);
        } else {
            sgds.notification(el, "show", options);
        }
        return;
    }
};

if (!sgds.isReady) {
    notifications = sgds.getElements("notification");
    if (notifications && notifications.length > 0) {
        for (i = 0, len = notifications.length; i < len; i++) {
            notification = notifications[i];
            options = sgds.parseOptions(notification);
            sgds.notification(notification, "hide", options);
        }
    }
}
var i, j, len, len1, tab, tabs, target, targets;

sgds.toggleTab = function(el) {
    var i, l, len, uls, links;
    uls = el.target.parentNode.parentNode;
    links = uls.querySelectorAll("li");
    for (i = 0, len = links.length; i < len; i++) {
        l = links[i];
        sgds.removeClass(l, "is-active");
        sgds.hide(
            document.querySelector(l.firstElementChild.getAttribute("data-tab"))
        );
    }
    sgds.addClass(el.target.parentNode, "is-active");
    sgds.show(document.querySelector(el.target.getAttribute("data-tab")));
};

// if (!sgds.isReady) {
//     tabs = sgds.getElements("tabs");
//     if (tabs && tabs.length > 0) {
//         for (i = 0, len = tabs.length; i < len; i++) {
//             tab = tabs[i];
//             targets = tab.querySelectorAll("[data-tab]");

//             for (j = 0, len1 = targets.length; j < len1; j++) {
//                 target = targets[j];

//                 tab = document.querySelector(target.getAttribute("data-tab"));
//                 if (sgds.hasClass(target.parentNode, "is-active") === false) {
//                     sgds.hide(tab);
//                 }
//                 sgds.click(target, sgds.toggleTab);
//             }
//         }
//     }
// }

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
