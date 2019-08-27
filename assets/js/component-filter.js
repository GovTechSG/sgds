(function() {
    if (document.getElementById("search-field")) {
        var options = {
            valueNames: ["component-name"]
        };
        var componentList = new List("standard-component", options);
        var componentList1 = new List("layouts-component", options);
        var componentList2 = new List("general-component", options);

        var eventTarget = document.getElementById("search-field");

        eventTarget.addEventListener("keyup", function() {
            var searchString = eventTarget.value;
            componentList.search(searchString);
            componentList1.search(searchString);
            componentList2.search(searchString);
        });
    }
})();
