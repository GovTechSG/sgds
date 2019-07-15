(function() {
    if(document.getElementById("search-field")){
        var options = {
            valueNames: ['component-name']
        };
        const componentList = new List('component-list1', options);
        const componentList1 = new List('component-list2', options);
        const componentList2 = new List('component-list3', options);

        const eventTarget = document.getElementById('search-field');

        eventTarget.addEventListener("keyup", event => {
            var searchString = eventTarget.value;
            componentList.search(searchString);
            componentList1.search(searchString);
            componentList2.search(searchString);
        });
    }

})();
