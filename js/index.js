let scrollnbrs;

function Select(elm) {
    //search and remove class "selected" from an elm
    var selected = document.querySelector(".selected");
    selected.classList.remove("selected");
    //add class "selected" to elm
    elm.classList.add("selected");
    // verify in for each elm in .item3 if innerText of elm exists
    let item3 = document.querySelector(".item3").innerText;

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

        document.querySelector(".item3").appendChild(newElm);
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
    let def = document.querySelector(".definition");
    //if elm with class "definition"
    //remove class "show" from child of elm with class "definition"
    for (let i = 0; i < def.children.length; i++) {
        // if elm with class "definition" has child with class "show" and id name is the same as elm with class "definition" child with class "show" remove class "show" and return
        if (def.children[i].classList.contains("show") && def.children[i].id == name) {
            def.children[i].classList.remove("show");
            return;
        } else {
            //remove class "show" from elm with class "definition" child
            def.children[i].classList.remove("show");
        }
    }
    //add class "show" to elm with id name
    document.getElementById(name).classList.add("show");
    // user go to anchor with id name
    window.location.hash = name;

    if (document.getElementById('item4').scrollHeight > scrollnbrs.scrollHeight) {
        resized();
    }
}

// wait for page load
window.onload = function () {

    scrollnbrs = document.getElementById("spe-item4");

    resized();

    // event listener on class "item4" and on scroll event
    document.getElementById('item4').addEventListener("scroll", function () {
        // assign offsetTop of elm with class "item4" to elm with class "spe-item4"
        scrollnbrs.scrollTop = this.scrollTop;
        console.log(this.scrollTop, scrollnbrs.scrollTop);
    });
}

function resized() {
    let nbr = Math.floor(document.getElementById('item4').scrollHeight / document.getElementById('balancing').clientHeight);
    console.log(nbr);
    // for x in range 0 to nbr add 1 to elm with class "spe-item4"
    let inc = 0;
    scrollnbrs.innerText = "";
    while (inc < nbr) {
        inc++;
        scrollnbrs.innerHTML += "<p>" + inc + ".</p>";
    }
}