function onlyNumberKey( evt ) {
    // Only ASCII character in that range allowed
    var ASCIICode = ( evt.which ) ? evt.which : evt.keyCode
    if ( ASCIICode > 31 && ( ASCIICode < 48 || ASCIICode > 57 ) )
        return evt.preventDefault();
    return true;
}

const dayInput = document.getElementById("day")
const monthInput = document.getElementById("month")
const yearInput = document.getElementById("year")

dayInput.addEventListener("keypress", (e) => onlyNumberKey(e))
monthInput.addEventListener("keypress", (e) => onlyNumberKey(e))
yearInput.addEventListener("keypress", (e) => onlyNumberKey(e))