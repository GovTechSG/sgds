(function() {
    if(document.getElementById("search-field")){
        var options = {
            valueNames: ['component-name']
        };
        const componentList = new List('standard-component', options);
        const componentList1 = new List('layouts-component', options);
        const componentList2 = new List('general-component', options);

        const eventTarget = document.getElementById('search-field');

        eventTarget.addEventListener("keyup", event => {
            var searchString = eventTarget.value;
            componentList.search(searchString);
            componentList1.search(searchString);
            componentList2.search(searchString);
        });
    }

})();
