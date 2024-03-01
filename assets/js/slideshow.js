let slideIndex = 0;
let slideTimeout;

function currentSlide(n) {
    clearTimeout(slideTimeout); // Clear existing timeout
    showSlides(slideIndex = n);
    resetTimeout(); // Set a new timeout
}

function resetTimeout() {
    clearTimeout(slideTimeout); // Clear existing timeout
    slideTimeout = setTimeout(autoSlide, 8000); // Set a new timeout
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slideshow-item");
    if (n > slides.length) { slideIndex = 1; }    
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex - 1].style.display = "block";  
    let dots = document.getElementsByClassName("slideshow-dot");
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    dots[slideIndex - 1].classList.add("active");
}

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimeout(); // Reset timeout after manual slide change
}

function autoSlide() {
    showSlides(slideIndex += 1);
    resetTimeout(); // Reset timeout after automatic slide change
}

autoSlide();
