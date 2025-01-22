function formatDate(event) {
    let dateVal = document.getElementById( "expiryDate" )
    let key = event.key
    if ( ( key != "Backspace" ) && dateVal.value.length == 2 ) {
        dateVal.value = dateVal.value + "/"
    }
}
function onlyNumberKey( evt ) {
    // Only ASCII character in that range allowed
    var ASCIICode = ( evt.which ) ? evt.which : evt.keyCode
    if ( ASCIICode > 31 && ( ASCIICode < 48 || ASCIICode > 57 ) )
        return evt.preventDefault();
    return true;
}

function creditCardFormatter( event ) {
    if (event.inputType == 'deleteContentBackward') {
        return event.target.value.trim()
    }
    const value = event.target.value
    const formattedValue = value.replace( /\W/gi, '' ).replace( /(.{4})/g, '$1 ' )
    if ( value.length === 19 ) {
        return formattedValue.trim()
    } else return formattedValue
}

const cardNumberInput = document.getElementById("cardNumber")
cardNumberInput.addEventListener('keypress', (e) => onlyNumberKey(e))
cardNumberInput.addEventListener('input', (e) => {
    cardNumberInput.value = creditCardFormatter(e)
})
const expiryDateInput = document.getElementById("expiryDate")
expiryDateInput.addEventListener('keypress', (e) => formatDate(e))

const cvvInput = document.getElementById("cvv")
cvvInput.addEventListener("keypress", (e) => onlyNumberKey(e))