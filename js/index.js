function Select(elm) {
    //search and remove class "selected" from an elm
    var selected = document.getElementsByClassName("selected");
    selected[0].classList.remove("selected");
    //add class "selected" to elm
    elm.classList.add("selected");
    // verify in for each elm in .item3 if innerText of elm exists
    let item3 = document.getElementsByClassName("item3")[0].innerText;

    // slice by \n
    item3 = item3.split("\n");
    let exist = false;
    for (let i = 0; i < item3.length; i++) {
        if (item3[i] == elm.innerText) {
            exist = true;
            break;
        }
    }
    //if not exist create new elm and add class="file-title html" hx-get="innerText" hx-trigger="click" hx-target=".item4" onclick="Select(document.getElementById('file-title'))"
    if (!exist) {
        let newElm = document.createElement("div");
        newElm.innerText = elm.innerText;
        newElm.classList.add("file-title");
        newElm.classList.add("html");
        newElm.setAttribute("hx-get", elm.getAttribute("hx-get"));
        newElm.setAttribute("hx-trigger", elm.getAttribute("hx-trigger"));
        newElm.setAttribute("hx-target", ".item4");
        newElm.setAttribute("onclick", "Select(document.getElementById('home')); this.remove();");

        document.getElementsByClassName("item3")[0].appendChild(newElm);
    }
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