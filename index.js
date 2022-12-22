function Select(elm) {
    //search and remove class "selected" from an elm
    var selected = document.getElementsByClassName("selected");
    selected[0].classList.remove("selected");
    //add class "selected" to elm
    elm.classList.add("selected");
    //change element with class 'file-title' text to elm text
    document.getElementsByClassName("file-title")[0].innerText = elm.innerText;
}