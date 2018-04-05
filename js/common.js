var BLUEPRINT;

if (typeof BLUEPRINT !== "object") {
    BLUEPRINT = {};
}

(function() {
    var hashCode;
    BLUEPRINT.hide = function(el) {
        var display;
        display = BLUEPRINT.isVisible(el);
        if (display) {
            el.style.display = 'none';
        }
    };
    BLUEPRINT.show = function(el) {
        var display;
        display = BLUEPRINT.isVisible(el);
        if (!display) {
            el.style.display = 'block';
        }
    };
    BLUEPRINT.toggle = function(el) {
        var display;
        display = BLUEPRINT.isVisible(el);
        if (!display) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    };
    BLUEPRINT.getElements = function(name) {
        return document.querySelectorAll('[data-blueprint="' + name + '"]');
    };
    BLUEPRINT.isVisible = function(el) {
        var display;
        if (window.getComputedStyle) {
            display = getComputedStyle(el, null).display;
        } else {
            display = el.currentStyle.display;
        }
        return display !== 'none';
    };
    BLUEPRINT.hasClass = function(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return new RegExp('\\b' + className + '\\b').test(el.className);
        }
    };
    BLUEPRINT.addClass = function(el, className) {
        if (el.classList) {
            return el.classList.add(className);
        } else if (!BLUEPRINT.hasClass(el, className)) {
            return el.className += ' ' + className;
        }
    };
    BLUEPRINT.removeClass = function(el, className) {
        if (el.classList) {
            return el.classList.remove(className);
        } else {
            return el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        }
    };
    BLUEPRINT.parseOptions = function(el) {
        var j, len, option, options, opts;
        opts = {};
        options = el.getAttribute('data-options');
        options = (options || '').replace(/\s/g, '').split(';');
        for (j = 0, len = options.length; j < len; j++) {
            option = options[j];
            if (option) {
                option = option.split(':');
                opts[option[0]] = option[1];
            }
        }
        return opts;
    };
    BLUEPRINT.click = function(el, handler) {
        if (!el.eventListener) {
            el.eventListener = true;
            return el.addEventListener('click', handler);
        }
    };
    BLUEPRINT.unclick = function(el, handler) {
        if (el.eventListener) {
            el.eventListener = false;
            return el.removeEventListener('click', handler);
        }
    };
    if (document.readyState !== 'loading') {
        BLUEPRINT.isReady = true;
        return;
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            BLUEPRINT.isReady = true;
        });
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                BLUEPRINT.isReady = true;
            }
        });
    }
    return hashCode = function(str) {
        var hash, i, j, len, s;
        hash = 0;
        for (i = j = 0, len = str.length; j < len; i = ++j) {
            s = str[i];
            hash = ~~(((hash << 5) - hash) + str.charCodeAt(i));
        }
        return hash;
    };



})();
;var i, j, len, len1, list, lists, menu, menuElems, options, subMenu;

BLUEPRINT.toggleMenu = function(el, options) {
    BLUEPRINT.collapseMenu(el, 'hide');
    BLUEPRINT.click(el, function(e) {
        var active, actives, i, len;
        e.preventDefault();
        e.stopPropagation();
        if (options.single) {
            actives = menu.querySelectorAll('.is-active');
            for (i = 0, len = actives.length; i < len; i++) {
                active = actives[i];
                if (active !== e.target) {
                    BLUEPRINT.removeClass(active, 'is-active');
                    if (active.nextElementSibling.nodeName === 'UL') {
                        BLUEPRINT.hide(active.nextElementSibling);
                    }
                }
            }
        }
        BLUEPRINT.collapseMenu(e.target, 'toggle');
    });
};

BLUEPRINT.collapseMenu = function(el, status) {
    var smenu;
    smenu = el.nextElementSibling;
    if (status === 'show') {
        BLUEPRINT.show(smenu);
        if (BLUEPRINT.isVisible(smenu)) {
            return BLUEPRINT.addClass(el, 'is-active');
        }
    } else if (status === 'hide') {
        BLUEPRINT.hide(smenu);
        if (!BLUEPRINT.isVisible(smenu)) {
            return BLUEPRINT.removeClass(el, 'is-active');
        }
    } else if (status === 'toggle') {
        BLUEPRINT.toggle(smenu);
        if (BLUEPRINT.isVisible(smenu)) {
            return BLUEPRINT.addClass(el, 'is-active');
        } else {
            return BLUEPRINT.removeClass(el, 'is-active');
        }
    }
};

if (!BLUEPRINT.isReady) {
    menuElems = BLUEPRINT.getElements('menu');
    if (menuElems && menuElems.length > 0) {
        for (i = 0, len = menuElems.length; i < len; i++) {
            menu = menuElems[i];
            options = BLUEPRINT.parseOptions(menu);
            lists = menu.querySelectorAll('.bp-menu-list');
            for (j = 0, len1 = lists.length; j < len1; j++) {
                list = lists[j];
                subMenu = list.querySelector('ul');
                if (subMenu) {
                    BLUEPRINT.toggleMenu(subMenu.previousElementSibling, options);
                }
            }
        }
    }
}

;var i, len, modal, modals, options;

BLUEPRINT.toggleModal = function(el, options) {
    if (!options.target) {
        throw new Error('Found [BLUEPRINT-MODAL] but there is no target defined!');
    }
    el.addEventListener('click', function(e) {

        var backdrop, closeBtn, closeModal, modal;
        e.preventDefault();
        e.stopPropagation();
        modal = document.getElementById(options.target);
        backdrop = modal.querySelector('.bp-modal-background');
        closeBtn = modal.querySelector('.bp-modal-close');
        closeModal = function() {
            if (BLUEPRINT.hasClass(modal, 'is-active')) {
                BLUEPRINT.removeClass(modal, 'is-active');
                return BLUEPRINT.unclick(this, closeModal);
            }
        };
        if (options.closeByBackdrop === void 0 || options.closeByBackdrop) {
            BLUEPRINT.click(backdrop, closeModal);
        }
        if (options.closeByButton === void 0 || options.closeByButton) {
            BLUEPRINT.click(closeBtn, closeModal);
        }
        BLUEPRINT.addClass(modal, 'is-active');
    });
};

if (!BLUEPRINT.isReady) {
    modals = BLUEPRINT.getElements('bp-modal');
    if (modals && modals.length > 0) {
        for (i = 0, len = modals.length; i < len; i++) {
            modal = modals[i];
            options = BLUEPRINT.parseOptions(modal);
            BLUEPRINT.toggleModal(modal, options);
        }
    }
}
;var i, len, notification, notifications, options;

BLUEPRINT.notification = function(el, status, options) {
    var deleteBtn, deleteNotification;
    if (options.deletable === void 0 || options.deletable !== false) {
        deleteBtn = el.querySelector('.delete');
        deleteNotification = function(e) {
            e.preventDefault();
            e.stopPropagation();
            el.parentNode.removeChild(el);
        };
    }
    if (status === 'show') {
        BLUEPRINT.removeClass(el, 'is-hidden');
        BLUEPRINT.click(deleteBtn, deleteNotification);
    } else if (status === 'hide') {
        BLUEPRINT.addClass(el, 'is-hidden');
    } else if (status === 'toggle') {
        if (BLUEPRINT.isVisible(el)) {
            BLUEPRINT.notification(el, 'hide', options);
        } else {
            BLUEPRINT.notification(el, 'show', options);
        }
        return;
    }
};

if (!BLUEPRINT.isReady) {
    notifications = BLUEPRINT.getElements('notification');
    if (notifications && notifications.length > 0) {
        for (i = 0, len = notifications.length; i < len; i++) {
            notification = notifications[i];
            options = BLUEPRINT.parseOptions(notification);
            BLUEPRINT.notification(notification, 'hide', options);
        }
    }
}
;var i, j, len, len1, tab, tabs, target, targets;

BLUEPRINT.toggleTab = function(el) {
    var i, l, len, links;
    links = el.target.parentNode.parentNode;
    links = links.querySelectorAll('li');
    for (i = 0, len = links.length; i < len; i++) {
        l = links[i];
        BLUEPRINT.removeClass(l, 'is-active');
        BLUEPRINT.hide(document.querySelector(l.firstChild.getAttribute('data-tab')));
    }
    BLUEPRINT.addClass(el.target.parentNode, 'is-active');
    BLUEPRINT.show(document.querySelector(el.target.getAttribute('data-tab')));
};

if (!BLUEPRINT.isReady) {
    tabs = BLUEPRINT.getElements('tabs');
    if (tabs && tabs.length > 0) {
        for (i = 0, len = tabs.length; i < len; i++) {
            tab = tabs[i];
            targets = tab.querySelectorAll('[data-tab]');
            for (j = 0, len1 = targets.length; j < len1; j++) {
                target = targets[j];
                tab = document.querySelector(target.getAttribute('data-tab'));
                if (BLUEPRINT.hasClass(target.parentNode, 'is-active') === false) {
                    BLUEPRINT.hide(tab);
                }
                BLUEPRINT.click(target, BLUEPRINT.toggleTab);
            }
        }
    }
}

// Get all "navbar-burger" elements
var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

// Check if there are any navbar burgers
if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {

            // Get the target from the "data-target" attribute
            var target = $el.dataset.target;
            var $target = document.getElementById(target);

            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
    });
}

// // Searchbar Activate
// var $searchActivate = document.getElementById('search-activate');
// var $searchDeactivate = document.getElementById('search-deactivate');
// var $searchBar = document.getElementById('search-bar');
// BLUEPRINT.hide($searchDeactivate);
// BLUEPRINT.hide($searchBar);
// BLUEPRINT.show($searchActivate);
//
// $searchActivate.addEventListener('click', function (event){
//     BLUEPRINT.toggle($searchDeactivate);
//     BLUEPRINT.toggle($searchBar);
//     BLUEPRINT.toggle($searchActivate);
// });
//
// $searchDeactivate.addEventListener('click', function (event){
//     BLUEPRINT.toggle($searchDeactivate);
//     BLUEPRINT.toggle($searchBar);
//     BLUEPRINT.toggle($searchActivate);
// });

// Dropdowns
var $dropdowns = getAll('.bp-dropdown:not(.is-hoverable)');

if ($dropdowns.length > 0) {
    $dropdowns.forEach(function ($el) {
        $el.addEventListener('click', function (event) {
            event.stopPropagation();
            $el.classList.toggle('is-active');
        });
    });

    document.addEventListener('click', function (event) {
        closeDropdowns();
    });
}

function closeDropdowns() {
    $dropdowns.forEach(function ($el) {
        $el.classList.remove('is-active');
    });
}

// Close dropdowns if ESC pressed
document.addEventListener('keydown', function (event) {
    var e = event || window.event;
    if (e.keyCode === 27) {
        closeDropdowns();
    }
});

// Functions
function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

$(document).ready(function(){
    var masthead_container = $('.masthead-container');
    var searchToggle = $('#search-activate');
    var searchIcon = $('#search-activate span');
    var searchBar = $('.search-bar');
    var searchBar_input = $('.search-bar input');
    searchToggle.on('click',function(e){
        e.preventDefault();
        searchIcon.toggleClass('bp-icon-search').toggleClass('bp-icon-cross');;
        searchBar.toggleClass('hide');
        searchBar_input.focus().val('');
        masthead_container.toggleClass('is-opened');
    });
});