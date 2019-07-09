var options = {
    valueNames: ['component-name']
};

var componentList = new List('component-list1', options);
var componentList1 = new List('component-list2', options);
var componentList2 = new List('component-list3', options);

var eventTarget = document.getElementById('search-field');
eventTarget.addEventListener("keyup", event => {
    var searchString = eventTarget.value;
    componentList.search(searchString);
    componentList1.search(searchString);
    componentList2.search(searchString);
});

