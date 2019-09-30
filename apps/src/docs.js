import ClipboardJS from "clipboard";
import List from "list.js";
import { default as $ } from "./lib/jQuery";

$(document).ready(function() {
  initializeCodeClipboard();
  initializeComponentFilter();
});

function initializeCodeClipboard() {
  var highlights = $(".language-html");
  highlights.each(function(key, value) {
    $(this).addClass("highlight" + key);
  });

  var clipboard = new ClipboardJS(".clipboard-btn");
  clipboard.on("success", function(e) {
    var originalText = e.trigger.innerHTML;
    e.clearSelection();
    e.trigger.textContent = "Copied";
    e.trigger.classList.add("is-success");
    window.setTimeout(function() {
      e.trigger.textContent = originalText;
      e.trigger.classList.remove("is-success");
    }, 1000);
  });

  var icon_classNameCopy = $(".icon-clipboard-btn small");
  icon_classNameCopy.each(function(key, value) {
    // $(this).addClass('icon_className' + key)
  });

  var icon_clipboard = new ClipboardJS(".icon-clipboard-btn");
  icon_clipboard.on("success", function(e) {
    var originalText = e.trigger.lastElementChild.innerText;
    e.clearSelection();
    e.trigger.classList.remove("sgds-tooltip");
    e.trigger.lastElementChild.innerText = "Copied";
    e.trigger.lastElementChild.classList.add("has-text-success");
    window.setTimeout(function() {
      e.trigger.lastElementChild.innerText = originalText;
      e.trigger.classList.add("sgds-tooltip");
      e.trigger.lastElementChild.classList.remove("has-text-success");
    }, 1000);
  });
}

function initializeComponentFilter() {
  if (document.getElementById("search-field")) {
    var options = {
      valueNames: ["component-name"]
    };
    var componentList = new List("standard-component", options);
    var componentList1 = new List("layouts-component", options);
    var componentList2 = new List("general-component", options);

    var eventTarget = document.getElementById("search-field");

    eventTarget.addEventListener("input", function() {
      var searchString = eventTarget.value;
      componentList.search(searchString);
      componentList1.search(searchString);
      componentList2.search(searchString);
    });
  }
}
