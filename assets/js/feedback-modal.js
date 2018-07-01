// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("feedbackForm");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the html element
var htmlElem = document.getElementsByTagName("HTML")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
	htmlElem.style.overflowY = "hidden";
    modal.style.display = "block";
    modal.style.overflowY = "scroll";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	htmlElem.style.overflowY = "auto";
    modal.style.display = "none";
    modal.style.overflowY = "scroll";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    	htmlElem.style.overflowY = "auto";
        modal.style.display = "none";
        modal.style.overflowY = "scroll";
    }
}