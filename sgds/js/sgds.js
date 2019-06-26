const sgds = {};
sgds.hide = function(el) {
    let display;
    display = sgds.isVisible(el);
    if (display) {
        el.style.display = "none";
    }
};
sgds.show = function(el) {
    let display;
    display = sgds.isVisible(el);
    if (!display) {
        el.style.display = "block";
    }
};
sgds.toggle = function(el) {
    let display;
    display = sgds.isVisible(el);
    if (!display) {
        el.style.display = "block";
    } else {
        el.style.display = "none";
    }
};
sgds.getElements = function(name) {
    return document.querySelectorAll('[data-sgds="' + name + '"]');
};
sgds.isVisible = function(el) {
    let display;
    if (window.getComputedStyle) {
        display = getComputedStyle(el, null).display;
    } else {
        display = el.currentStyle.display;
    }
    return display !== "none";
};
sgds.hasClass = function(el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    } else {
        return new RegExp("\\b" + className + "\\b").test(el.className);
    }
};
sgds.addClass = function(el, className) {
    if (el.classList) {
        return el.classList.add(className);
    } else if (!sgds.hasClass(el, className)) {
        return (el.className += " " + className);
    }
};
sgds.removeClass = function(el, className) {
    if (el.classList) {
        return el.classList.remove(className);
    } else {
        return (el.className = el.className.replace(
            new RegExp("\\b" + className + "\\b", "g"),
            ""
        ));
    }
};
sgds.parseOptions = function(el) {
    let j, len, option, options, opts;
    opts = {};
    options = el.getAttribute("data-options");
    options = (options || "").replace(/\s/g, "").split(";");
    for (j = 0, len = options.length; j < len; j++) {
        option = options[j];
        if (option) {
            option = option.split(":");
            opts[option[0]] = option[1];
        }
    }
    return opts;
};
sgds.click = function(el, handler) {
    if (!el.eventListener) {
        el.eventListener = true;
        return el.addEventListener("click", handler);
    }
};
sgds.unclick = function(el, handler) {
    if (el.eventListener) {
        el.eventListener = false;
        return el.removeEventListener("click", handler);
    }
};
sgds.getSiblings = function(el) {
	// Setup siblings array and get the first sibling
	const siblings = [];
	let sibling = el.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === Node.ELEMENT_NODE && sibling !== el) {
			siblings.push(sibling);
		}
		sibling = sibling.nextElementSibling
	}

	return siblings;
};

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

export default sgds;