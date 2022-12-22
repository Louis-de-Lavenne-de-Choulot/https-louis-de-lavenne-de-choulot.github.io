function Select(elm) {
    //search and remove class "selected" from an elm
    var selected = document.getElementsByClassName("selected");
    selected[0].classList.remove("selected");
    //add class "selected" to elm
    elm.classList.add("selected");
    //change element with class 'file-title' text to elm text
    document.getElementsByClassName("file-title")[0].innerText = elm.innerText;
}

function DropDown(elm, elm2) {
    //elm ::before rotate 90deg
    if (elm.classList.contains("rotate")) {
        elm.classList.remove("rotate");
        elm.classList.add("rotate-down");
    } else {
        elm.classList.add("rotate");
        elm.classList.remove("rotate-down");
    }
    //toggle class "dropdown" on elm2
    elm2.classList.toggle("dropdown");
}