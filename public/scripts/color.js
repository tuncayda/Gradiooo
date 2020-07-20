function openOverlay(e) {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('overlay');
    overlay.style.backgroundImage = e.style.backgroundImage;
    overlay.style.display = 'block';
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}


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
    e.innerText = 'Copied';
    // e.innerHTML = '<p>Copied &#128077;</p>';
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