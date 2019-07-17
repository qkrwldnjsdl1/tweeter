const textarea = document.querySelector("#textarea");
const tweet = document.querySelector("#input");
const form = document.getElementById('form');
const article = document.getElementsByClassName("posted")

form.addEventListener("submit", event => {
    article.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
})
textarea.addEventListener("input", event => {
    const target = event.currentTarget;
    const currentLength = target.value.length;
    const maxLength = 140
    if (currentLength > maxLength) {
        document.getElementById('counter').innerHTML = maxLength - currentLength
        document.getElementById('counter').style.color = "red";
    } else {
        document.getElementById('counter').innerHTML = maxLength - currentLength;
        document.getElementById('counter').style.color = "black";
    }
});


