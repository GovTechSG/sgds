export function initSecondLevelNavInteraction() {
    let secondLevelNavHeaderArray = document.querySelectorAll(
        "ul.sgds-menu-list > li"
    );
    for (let index = 0; index < secondLevelNavHeaderArray.length; index++) {
        // Check if next element is third-level-nav
        let navHeader = secondLevelNavHeaderArray[index];
        let nextEl = navHeader.nextElementSibling;
        if (nextEl && nextEl.classList.contains("third-level-nav")) {
            navHeader.addEventListener("click", event => {
                let navIcon = navHeader.querySelector("i.sgds-icon");
                if (nextEl.classList.contains("is-hidden")) {
                    nextEl.classList.remove("is-hidden");
                    navIcon.classList.remove("sgds-icon-chevron-down");
                    navIcon.classList.add("sgds-icon-chevron-up");
                } else {
                    nextEl.classList.add("is-hidden");
                    navIcon.classList.remove("sgds-icon-chevron-up");
                    navIcon.classList.add("sgds-icon-chevron-down");
                }
            });
        }
    }

    // var secondLevelNavHeaderMobileArray = document.querySelectorAll(
    //     "a.second-level-nav-header-mobile"
    // );

    // for (
    //     var index = 0;
    //     index < secondLevelNavHeaderMobileArray.length;
    //     index++
    // ) {
    //     function secondLevelNavMobileClosure() {
    //         var closureIndex = index;
    //         function toggleSecondLevelNavMobileDiv() {
    //             // Get the icon of the second-level-nav-header
    //             var secondLevelNavMobileIcon = secondLevelNavHeaderMobileArray[
    //                 closureIndex
    //             ].getElementsByTagName("I")[0];
    //             var secondLevelMobileDiv = document.getElementsByClassName(
    //                 "second-level-nav-div-mobile"
    //             )[closureIndex];
    //             if (secondLevelMobileDiv.classList.contains("is-hidden")) {
    //                 secondLevelNavMobileIcon.classList.remove(
    //                     "sgds-icon-chevron-down"
    //                 );
    //                 secondLevelNavMobileIcon.classList.add(
    //                     "sgds-icon-chevron-up"
    //                 );
    //                 secondLevelMobileDiv.classList.remove("is-hidden");
    //             } else {
    //                 secondLevelMobileDiv.classList.add("is-hidden");
    //                 secondLevelNavMobileIcon.classList.remove(
    //                     "sgds-icon-chevron-up"
    //                 );
    //                 secondLevelNavMobileIcon.classList.add(
    //                     "sgds-icon-chevron-down"
    //                 );
    //             }
    //         }
    //         return toggleSecondLevelNavMobileDiv;
    //     }

    //     secondLevelNavHeaderMobileArray[index].addEventListener(
    //         "click",
    //         secondLevelNavMobileClosure()
    //     );
    // }
}
