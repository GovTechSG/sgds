function findAddress() {
    var postalCode = document.getElementById("postalCode").value
    var streetName = document.getElementById("streetName")
    fetch(
        'https://www.onemap.gov.sg/api/common/elastic/search?searchVal=' +
        postalCode +
        '&returnGeom=Y&getAddrDetails=Y'
    )
    .then((response) => response.json())
    .then((json) => 
        streetName.value = json.results[0].ADDRESS
    );
}
function onlyNumberKey( evt ) {
    // Only ASCII character in that range allowed
    var ASCIICode = ( evt.which ) ? evt.which : evt.keyCode
    if ( ASCIICode > 31 && ( ASCIICode < 48 || ASCIICode > 57 ) )
        return evt.preventDefault();
    return true;
}

const findAddressBtn = document.getElementById("find-address-btn")
findAddressBtn.addEventListener("click", findAddress)

const inputPostalCode = document.getElementById("postalCode")
inputPostalCode.addEventListener("keypress", (e) => onlyNumberKey(e))