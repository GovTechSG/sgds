initSecondLevelNavInteraction();

function initSecondLevelNavInteraction() {
    var secondLevelNavHeaderArray = document.querySelectorAll("li.second-level-nav-header");
    for (var index = 0; index < secondLevelNavHeaderArray.length; index++) {

        function secondLevelNavClosure() {
            var closureIndex = index;
            function toggleSecondLevelNavDiv() {
                // Get the icon of the second-level-nav-header
                var secondLevelNavIcon = secondLevelNavHeaderArray[closureIndex].getElementsByTagName("I")[0];
                var secondLevelDiv = document.getElementsByClassName("second-level-nav-div")[closureIndex];

                if (secondLevelDiv.classList.contains("is-hidden")) {
                    secondLevelNavIcon.classList.remove("sgds-icon-chevron-down");
                    secondLevelNavIcon.classList.add("sgds-icon-chevron-up");
                    secondLevelDiv.classList.remove("is-hidden");
                } else {
                    secondLevelDiv.classList.add("is-hidden");
                    secondLevelNavIcon.classList.remove("sgds-icon-chevron-up");
                    secondLevelNavIcon.classList.add("sgds-icon-chevron-down");
                }
            }
            return toggleSecondLevelNavDiv;
        }

        secondLevelNavHeaderArray[index].addEventListener("click", secondLevelNavClosure());
    }

    var secondLevelNavHeaderMobileArray = document.querySelectorAll("a.second-level-nav-header-mobile");

    for (var index = 0; index < secondLevelNavHeaderMobileArray.length; index++) {
        function secondLevelNavMobileClosure() {
            var closureIndex = index;
            function toggleSecondLevelNavMobileDiv() {
                // Get the icon of the second-level-nav-header
                var secondLevelNavMobileIcon = secondLevelNavHeaderMobileArray[closureIndex].getElementsByTagName("I")[0];
                var secondLevelMobileDiv = document.getElementsByClassName("second-level-nav-div-mobile")[closureIndex];
                if (secondLevelMobileDiv.classList.contains("is-hidden")) {
                    secondLevelNavMobileIcon.classList.remove("sgds-icon-chevron-down");
                    secondLevelNavMobileIcon.classList.add("sgds-icon-chevron-up");
                    secondLevelMobileDiv.classList.remove("is-hidden");
                } else {
                    secondLevelMobileDiv.classList.add("is-hidden");
                    secondLevelNavMobileIcon.classList.remove("sgds-icon-chevron-up");
                    secondLevelNavMobileIcon.classList.add("sgds-icon-chevron-down");
                }
            }
            return toggleSecondLevelNavMobileDiv;
        }

        secondLevelNavHeaderMobileArray[index].addEventListener("click", secondLevelNavMobileClosure());
    }
}
