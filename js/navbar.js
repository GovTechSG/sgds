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

$(document).ready(function(){
    var masthead_container = $('.masthead-container');
    var searchToggle = $('#search-activate');
    var searchIcon = $('#search-activate span');
    var searchBar = $('.search-bar');
    var searchBar_input = $('.search-bar input');
    searchToggle.on('click',function(e){
        e.preventDefault();
        searchIcon.toggleClass('bp-icon-search').toggleClass('bp-icon-cross');;
        searchBar.toggleClass('hide');
        searchBar_input.focus().val('');
        masthead_container.toggleClass('is-opened');
    });
});