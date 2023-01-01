let scrollnbrs;

function Select(elm) {
    // stop onclick event
    event.stopPropagation();

    //search and remove class "selected" from an elm
    var selected = document.querySelector(".selected");
    selected.classList.remove("selected");
    //add class "selected" to elm
    elm.classList.add("selected");
    // verify in for each elm in .item3 if innerText of elm exists
    let item3 = document.querySelector(".item3");

    let exist;
    // for each child
    for (let i = 0; i < item3.children.length; i++) {
        // if child innerText is the same as elm innerText remove child
        if (item3.children[i].innerText == elm.innerText) {
            exist = item3.children[i];
            break;
        }
    }
    //if not exist create new elm and add class="file-title html" hx-get="innerText" hx-trigger="click" hx-target=".item4" onclick="Select(document.getElementById('file-title'))"
    if (exist == undefined) {
        let newElm = document.createElement("div");
        newElm.innerText = elm.innerText;
        newElm.classList.add("file-title");
        newElm.classList.add("html");
        newElm.setAttribute("onclick", "Select(this); DynamicLoading('"+elm.getAttribute("hx-get")+"')");
        // create div in newElm
        let newElm2 = document.createElement("div");
        newElm2.classList.add("file-title-af");
        // select home then remove parent
        newElm2.setAttribute("onclick", "Select(document.getElementById('home')); this.parentElement.remove()");
        newElm.appendChild(newElm2);
        document.querySelector(".item3").appendChild(newElm);
        exist = newElm;
    }
    // remove selected-inverse class from the elm using it and add it to exist
    let selectedInverse = document.querySelector(".selected-inverse");
    if (selectedInverse != undefined) {
        selectedInverse.classList.remove("selected-inverse");
    }
    exist.classList.add("selected-inverse");

    // query select code-container and verify if it has class dropdown dropdown-container
    let presentation = document.querySelector(".presentation");
    if (!presentation.classList.contains("dropdown")) {
        DropDown(document.querySelector(".round-button"), presentation);
    }
}

function DynamicLoading(pageName) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pageName, true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return; // or whatever error handling you want
        document.getElementById('item4-container').innerHTML = this.responseText;
    };
    xhr.send();
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

    // if elm is not an h4
    if (elm.tagName != "H4") {
        document.querySelector(".code-container").classList.toggle("dropdown-container");
        // add background-color: #1e1e1e; to "item1"
        if (document.getElementById("item1").style.backgroundColor == "rgb(30, 30, 30)") {
            document.getElementById("item1").style.backgroundColor = "";
        } else {
            document.getElementById("item1").style.backgroundColor = "#1e1e1e";
        }

        resized();
    }
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

    // event listener on class "item4" and mutation observer
    let observer = new MutationObserver(function (mutations) {
        resized();
    });
    observer.observe(document.getElementById('item4-container'), {
        // observe innerHTML
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true

    });
}

function resized() {
    let nbr = Math.floor(document.getElementById('item4-container').scrollHeight / document.getElementById('balancing').clientHeight + .5);
    // for x in range 0 to nbr add 1 to elm with class "spe-item4"
    let inc = 0;
    scrollnbrs.innerHTML = "";
    while (inc < nbr) {
        inc++;
        scrollnbrs.innerHTML += "<p>" + inc + ".</p>";
    }
}