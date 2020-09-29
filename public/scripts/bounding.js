let LOGO_ID = 'toolbar';
let element = document.getElementById(LOGO_ID);

// Hide toolbar on scroll down, show on scroll up
var prevPos = window.pageYOffset;
let toolbar = document.getElementById('toolbar');

window.onscroll = function() {
    var currentPos = window.pageYOffset;
    if (currentPos > 1000) {
        window.scroll(0, -1000);
        document.querySelector('.landing-page').style = 'height: 0; overflow: hidden';
    }
    if (prevPos > currentPos) {
        element.style.top = '0';
        element.style.opacity = '95%';
    } else {
        element.style.top = '-100px';
    }
    prevPos = currentPos;
}

window.addEventListener('scroll', function(event) {
    if (isInViewport(element)) {
        element.classList.remove('hidden');
        element.classList.add('fade-in-element');
    }
}, false);

// Returns true if element is within viewport
function isInViewport() {
    let bounding = element.getBoundingClientRect();

    // Get browser inner width and height with fallback
    let innerWidth = (window.innerWidth || document.documentElement.clientWidth);
    let innerHeight = (window.innerHeight || document.documentElement.clientHeight);

    // Check if element is within viewport
    return (
        bounding.top >=  0              &&
        bounding.left >= 0              &&
        bounding.right <= innerWidth    &&
        bounding.bottom <= innerHeight
        );
}