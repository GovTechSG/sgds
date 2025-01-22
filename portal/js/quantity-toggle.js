function decrement(inputId) {
    let input = document.getElementById("quantity" + inputId)
    input.value = parseInt(input.value) - 1
}

function increment(inputId) {
    let input = document.getElementById("quantity" + inputId)
    input.value = parseInt(input.value) + 1
}
const leftDisabled = document.getElementById("right-btn-left-disabled")
leftDisabled.addEventListener("click", () =>increment('LeftDisabled'))

const rightDisabled = document.getElementById("left-btn-right-disabled")
rightDisabled.addEventListener("click", () => decrement('RightDisabled'))

const left = document.getElementById("left-btn")
left.addEventListener("click", () => decrement('Enabled'))

const right = document.getElementById("right-btn")
right.addEventListener("click", () => increment('Enabled'))