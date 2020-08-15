
/**
 * When user clicks on a color, it will expand to fullscreen
 */
function openOverlay(e) {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('overlay');
    overlay.style.backgroundImage = e.style.backgroundImage;

    // Prevent background (body) from scrolling when modal is open
    document.querySelector("body").style.overflow = 'hidden';
    overlay.style.display = 'block';
}

function closeOverlay() {
    document.querySelector("body").style.overflow = 'visible';
    document.getElementById('overlay').style.display = 'none';
}

/**
 * Style the hexcode on hover using the corresponding hexvalue
 */
function colorMouseOver(e) {
    e.style.borderBottom = "2px solid #" + e.innerText;
}

function colorMouseOut(e) {
    e.style.borderBottom = "none";
}

/**
 * Copy hexcode tu users clipboard
 * Show confirmation after user clicks on hexcode
 */
function copyHex(e) {
    let hexcode = e.innerText;
    copyToClipboard(hexcode);
    e.innerText = 'Copied';
    setTimeout(() => {
        e.innerText = hexcode;
    }, 1500);
}

/**
 * Helper function to copy the hexcode into users clipboard
 */
function copyToClipboard(str) {
    var textArea = document.createElement("textarea");
    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}