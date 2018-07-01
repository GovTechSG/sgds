var sgds;

if (typeof sgds !== "object") {
    sgds = {};
}

(function() {
    var hashCode;
    sgds.hide = function(el) {
        var display;
        display = sgds.isVisible(el);
        if (display) {
            el.style.display = 'none';
        }
    };
    sgds.show = function(el) {
        var display;
        display = sgds.isVisible(el);
        if (!display) {
            el.style.display = 'block';
        }
    };
    sgds.toggle = function(el) {
        var display;
        display = sgds.isVisible(el);
        if (!display) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    };
    sgds.getElements = function(name) {
        return document.querySelectorAll('[data-sgds="' + name + '"]');
    };
    sgds.isVisible = function(el) {
        var display;
        if (window.getComputedStyle) {
            display = getComputedStyle(el, null).display;
        } else {
            display = el.currentStyle.display;
        }
        return display !== 'none';
    };
    sgds.hasClass = function(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return new RegExp('\\b' + className + '\\b').test(el.className);
        }
    };
    sgds.addClass = function(el, className) {
        if (el.classList) {
            return el.classList.add(className);
        } else if (!sgds.hasClass(el, className)) {
            return el.className += ' ' + className;
        }
    };
    sgds.removeClass = function(el, className) {
        if (el.classList) {
            return el.classList.remove(className);
        } else {
            return el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
        }
    };
    sgds.parseOptions = function(el) {
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
    sgds.click = function(el, handler) {
        if (!el.eventListener) {
            el.eventListener = true;
            return el.addEventListener('click', handler);
        }
    };
    sgds.unclick = function(el, handler) {
        if (el.eventListener) {
            el.eventListener = false;
            return el.removeEventListener('click', handler);
        }
    };
    if (document.readyState !== 'loading') {
        sgds.isReady = true;
        return;
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            sgds.isReady = true;
        });
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                sgds.isReady = true;
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

sgds.toggleMenu = function(el, options) {
    sgds.collapseMenu(el, 'hide');
    sgds.click(el, function(e) {
        var active, actives, i, len;
        e.preventDefault();
        e.stopPropagation();
        if (options.single) {
            actives = menu.querySelectorAll('.is-active');
            for (i = 0, len = actives.length; i < len; i++) {
                active = actives[i];
                if (active !== e.target) {
                    sgds.removeClass(active, 'is-active');
                    if (active.nextElementSibling.nodeName === 'UL') {
                        sgds.hide(active.nextElementSibling);
                    }
                }
            }
        }
        sgds.collapseMenu(e.target, 'toggle');
    });
};

sgds.collapseMenu = function(el, status) {
    var smenu;
    smenu = el.nextElementSibling;
    if (status === 'show') {
        sgds.show(smenu);
        if (sgds.isVisible(smenu)) {
            return sgds.addClass(el, 'is-active');
        }
    } else if (status === 'hide') {
        sgds.hide(smenu);
        if (!sgds.isVisible(smenu)) {
            return sgds.removeClass(el, 'is-active');
        }
    } else if (status === 'toggle') {
        sgds.toggle(smenu);
        if (sgds.isVisible(smenu)) {
            return sgds.addClass(el, 'is-active');
        } else {
            return sgds.removeClass(el, 'is-active');
        }
    }
};

if (!sgds.isReady) {
    menuElems = sgds.getElements('menu');
    if (menuElems && menuElems.length > 0) {
        for (i = 0, len = menuElems.length; i < len; i++) {
            menu = menuElems[i];
            options = sgds.parseOptions(menu);
            lists = menu.querySelectorAll('.sgds-menu-list');
            for (j = 0, len1 = lists.length; j < len1; j++) {
                list = lists[j];
                subMenu = list.querySelector('ul');
                if (subMenu) {
                    sgds.toggleMenu(subMenu.previousElementSibling, options);
                }
            }
        }
    }
}

;var i, len, modal, modals, options;

sgds.toggleModal = function(el, options) {
    if (!options.target) {
        throw new Error('Found [sgds-MODAL] but there is no target defined!');
    }
    el.addEventListener('click', function(e) {

        var backdrop, closeBtn, closeModal, modal;
        e.preventDefault();
        e.stopPropagation();
        modal = document.getElementById(options.target);
        backdrop = modal.querySelector('.sgds-modal-background');
        closeBtn = modal.querySelector('.sgds-modal-close');
        closeModal = function() {
            if (sgds.hasClass(modal, 'is-active')) {
                sgds.removeClass(modal, 'is-active');
                return sgds.unclick(this, closeModal);
            }
        };
        if (options.closeByBackdrop === void 0 || options.closeByBackdrop) {
            sgds.click(backdrop, closeModal);
        }
        if (options.closeByButton === void 0 || options.closeByButton) {
            sgds.click(closeBtn, closeModal);
        }
        sgds.addClass(modal, 'is-active');
    });
};

if (!sgds.isReady) {
    modals = sgds.getElements('sgds-modal');
    if (modals && modals.length > 0) {
        for (i = 0, len = modals.length; i < len; i++) {
            modal = modals[i];
            options = sgds.parseOptions(modal);
            sgds.toggleModal(modal, options);
        }
    }
}
;var i, len, notification, notifications, options;

sgds.notification = function(el, status, options) {
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
        sgds.removeClass(el, 'is-hidden');
        sgds.click(deleteBtn, deleteNotification);
    } else if (status === 'hide') {
        sgds.addClass(el, 'is-hidden');
    } else if (status === 'toggle') {
        if (sgds.isVisible(el)) {
            sgds.notification(el, 'hide', options);
        } else {
            sgds.notification(el, 'show', options);
        }
        return;
    }
};

if (!sgds.isReady) {
    notifications = sgds.getElements('notification');
    if (notifications && notifications.length > 0) {
        for (i = 0, len = notifications.length; i < len; i++) {
            notification = notifications[i];
            options = sgds.parseOptions(notification);
            sgds.notification(notification, 'hide', options);
        }
    }
}
;var i, j, len, len1, tab, tabs, target, targets;

sgds.toggleTab = function(el) {
    var i, l, len, links;
    links = el.target.parentNode.parentNode;
    links = links.querySelectorAll('li');
    for (i = 0, len = links.length; i < len; i++) {
        l = links[i];
        sgds.removeClass(l, 'is-active');
        sgds.hide(document.querySelector(l.firstChild.getAttribute('data-tab')));
    }
    sgds.addClass(el.target.parentNode, 'is-active');
    sgds.show(document.querySelector(el.target.getAttribute('data-tab')));
};

if (!sgds.isReady) {
    tabs = sgds.getElements('tabs');
    if (tabs && tabs.length > 0) {
        for (i = 0, len = tabs.length; i < len; i++) {
            tab = tabs[i];
            targets = tab.querySelectorAll('[data-tab]');
            for (j = 0, len1 = targets.length; j < len1; j++) {
                target = targets[j];
                tab = document.querySelector(target.getAttribute('data-tab'));
                if (sgds.hasClass(target.parentNode, 'is-active') === false) {
                    sgds.hide(tab);
                }
                sgds.click(target, sgds.toggleTab);
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

// Dropdowns


var $dropdowns = getAll('.sgds-dropdown:not(.is-hoverable)');

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


//Accordion

$(document).ready(function () {
    console.log("hey accordion")

});