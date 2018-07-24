var prevScrollpos = window.pageYOffset;
var heightOfNavbar = document.getElementsByClassName("masthead-container")[0].clientHeight;
var mastheadElem = document.getElementsByClassName("masthead-container")[0];

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;

  if (currentScrollPos < heightOfNavbar && !$('html').hasClass('touch')) {
  	mastheadElem.style.top = "0";
  	// mastheadElem.style.top = "-" + currentScrollPos + "px";
  }
  else if (prevScrollpos > currentScrollPos) {
    mastheadElem.style.top = "0";
  } else {
    mastheadElem.style.top = "-"+ heightOfNavbar + "px";
  }
  prevScrollpos = currentScrollPos;
}
