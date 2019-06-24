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

export default sgds;