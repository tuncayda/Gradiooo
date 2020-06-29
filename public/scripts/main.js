// Count how many pages the users has clicked for the pagination
let page = 1;

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

// document.querySelectorAll('.color').forEach((element) => {
//     element.addEventListener('click', (e) => {
//         if (e.target.className === 'like') {
//             likeColor(element);
//         }
//     })
// })

const loadColors = async () => {
    page += 1;
    await axios({
        method: 'GET',
        url: `?page=${page}`
    }).then(res => {
        const colorContainer = document.getElementById('main__content');
        for(let i = 0; i < res.data.colors.length; i++) {
            let title = res.data.colors[i].title;
            let hexcode1 = res.data.colors[i].colors[0];
            let hexcode2 = res.data.colors[i].colors[1];
            const colorComponent = `
            <div class="color">
                        <p class="color__title">
                        ${title}
                        </p>
                        <div class="color__container">
                            <div class="color__shape" 
                                style="background-image: linear-gradient(to bottom, #${hexcode1}, #${hexcode2})"
                            ></div>
                            <div class="color__side">
                                <div class="color__hexcodes">
                                    <span class="color__hexcode" onmouseover="colorMouseOver(this);" onmouseout="colorMouseOut(this);" onclick="colorMouseClick(this);">${hexcode1}</span>
                                    <span class="color__hexcode" onmouseover="colorMouseOver(this);" onmouseout="colorMouseOut(this);" onclick="colorMouseClick(this);">${hexcode2}</span>
                                </div>
                                <div class="color__side--divider"></div>
                                <div class="color__likes scale"><img src="../img/likes.svg" alt="Likes icon"></div>
                                <div class="color__side--divider"></div>
                                <div class="color__downloads scale"><img src="../img/download.svg" alt="Download icon"></div>
                            </div>
                        </div>
                    </div>
            `;
            colorContainer.insertAdjacentHTML('beforeend', colorComponent);
        }
    }).catch(err => {
        console.log(err);
    })
}
