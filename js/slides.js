function plusSlides(nbr) {
    // get index of elm with class "custom-slider" +nbr that has class "show"
    let index = Array.from(document.getElementsByClassName("custom-slider"+nbr)).findIndex(elm => elm.classList.contains("show"));
    
    showSlides(document.getElementsByClassName("custom-slider"+nbr), index++);
}

function minusSlides(nbr) {
    // get index of elm with class "custom-slider" +nbr that has class "show"
    let index = Array.from(document.getElementsByClassName("custom-slider"+nbr)).findIndex(elm => elm.classList.contains("show"));
    showSlides(document.getElementsByClassName("custom-slider"+nbr), index--);
}

function showSlides(slides, n) {
    if (n > slides.length) {
        n = 1
    }
    if (n < 1) {
        n = slides.length
    }
    for (let i = 0; i < slides.length; i++) {
        // remove class "show" from
        slides[i].classList.remove("show");
    }
    // add class "show" to elm with class "custom-slider" +nbr
    slides[n - 1].classList.add("show");
}