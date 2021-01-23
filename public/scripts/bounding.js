let LOGO_ID = 'toolbar';
let element = document.getElementById(LOGO_ID);

/**
 * Hide toolbar on scroll down, show on scroll up
 */
var prevPos = window.pageYOffset;
let toolbar = document.getElementById('toolbar');

window.onscroll = function() {
    var currentPos = window.pageYOffset;
    if (currentPos > 900) {
        document.querySelector('.landing-page').style = 'display: none';
    }
    if (prevPos > currentPos) {
        element.style.top = '0';
        element.style.opacity = '95%';
    } else {
        element.style.top = '-100px';
    }
    prevPos = currentPos;
}
/**
 * If element is in viewport, fade in that element
 */
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