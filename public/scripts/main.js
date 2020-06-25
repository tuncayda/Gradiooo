// https://www.w3schools.com/charsets/ref_emoji.asp
let emojis = ['129409','9757', '9969', '9996','11088','127801','127881'];

function randomSelect() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Style hexcode on hover
function colorMouseOver(e) {
    e.style.borderBottom = "2px solid #" + e.innerText;
    e.classList.add('pointer');
}

function colorMouseOut(e) {
    e.style.borderBottom = "none";
}

// Show confirmation after user clicks on hexcode
function colorMouseClick(e) {
    let hexcode = e.innerText;
    copyToClipboard(hexcode);
    // e.innerText = 'Copied';
    e.innerHTML = '<p>Copied &#128077;</p>';
    setTimeout(() => {
        e.innerText = hexcode;
    }, 1500);
}

function copyToClipboard(str) {
    var textArea = document.createElement("textarea");
    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}

let LOGO_ID = 'toolbar';
let element = document.getElementById(LOGO_ID);


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
bounding.left >= 0             &&
bounding.right <= innerWidth   &&
bounding.bottom <= innerHeight
);
}

const likeColor = async (element) => {
    const colorID = element.parentNode.parentNode.parentNode.parentNode.id;
    await axios({
        method: 'post',
        url: 'http://localhost:8080/api/v1/colors/like',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            id: colorID
        }
    });
}