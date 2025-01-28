function searchItem() {
    const input = document
        .getElementById( "filterItems" )
        .value.toUpperCase();

        const cardContainer = document.getElementById( "grid" );

    const cards = cardContainer.getElementsByClassName( "card" );

    for ( let i = 0; i < cards.length; i++ ) {
        let title = cards[ i ].querySelector( ".card-body a div.card-title" );
        let description = cards[ i ].querySelector( ".card-text" );
        let textTitle = title.textContent || title.innerText;
        let textDescription =
            description.textContent || description.innerText;
        if (
            textTitle.toUpperCase().indexOf( input ) > -1 ||
            textDescription.toUpperCase().indexOf( input ) > -1
        ) {
            cards[ i ].style.display = "";
        } else {
            cards[ i ].style.display = "none";
        }
    }
}
const input  = document.getElementById("filterItems")
input.addEventListener("keyup", searchItem)