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
        // if elm has class directory add class rotate-down
        if (elm.classList.contains("directory")) {
            elm.classList.add("rotate-down");
        }
    } else {
        elm.classList.add("rotate");
        elm.classList.remove("rotate-down");
    }
    //toggle class "dropdown" on elm2
    elm2.classList.toggle("dropdown");
}

function Definition(name) {
    //get elm with class "definition"
    let def = document.getElementsByClassName("definition");
    //if elm with class "definition"
    if (def.length == 1) {
        //remove class "show" from child of elm with class "definition"
        for (let i = 0; i < def[0].children.length; i++) {
            // if elm with class "definition" has child with class "show" and id name is the same as elm with class "definition" child with class "show" remove class "show" and return
            if (def[0].children[i].classList.contains("show") && def[0].children[i].id == name) {
                def[0].children[i].classList.remove("show");
                return;
            } else {
                //remove class "show" from elm with class "definition" child
                def[0].children[i].classList.remove("show");
            }
        }
        //add class "show" to elm with id name
        document.getElementById(name).classList.add("show");
    }
    // user go to anchor with id name
    window.location.hash = name;
}