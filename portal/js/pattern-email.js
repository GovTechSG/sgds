function setValidation() {
    let ele = document.getElementById("email")
    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(ele.value)) {
        ele.classList.remove("is-invalid")
        ele.classList.add("is-valid")
    } else {
        ele.classList.remove("is-valid")
        ele.classList.add("is-invalid")
    }
}

const input = document.getElementById("email")
input.addEventListener("input", setValidation)