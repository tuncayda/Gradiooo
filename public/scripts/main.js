/*
    EXPORT CANVAS TO PNG
*/
// var canvas = document.querySelector('canvas');
// var context = canvas.getContext('2d');
// context.fillStyle = 'green';
// context.fillRect(50, 50, 100, 100);
// window.location = canvas.toDataURL('image/png');

// Count how many pages the users has clicked for the pagination
let page = 1;
let limit = 10;
let liked = 0;
let likedList = new Map();

// function getListItemDetails(e) {
    
// }

function deleteListItem(e) {
    e.style.display = 'none';
    liked--;
    let list = document.getElementById('colorList');
    list.innerText = liked;
}

function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    } else {
        return str.slice(0, num) + '...'
    }
}

function getChildNodes(node) {
    const charLimit = 12;

    return {
        'title': truncateString(node.getElementsByClassName('color__title')[0].innerText, charLimit),
        'color': node.getElementsByClassName('color__shape')[0].style.backgroundImage 
    }
}

function addToList(color) {
    let list = document.getElementById('colorList');
    let obj = getChildNodes(color);
    if (!likedList.has(color.id)) {
        likedList.set(color.id, obj );
        liked += 1;
        list.textContent = liked;
        let listSummary = document.getElementById('liked-list');
        const listItem = `
            <div class="toolbar-heart__list__item" onclick="deleteListItem(this)">
                <span>${obj.title}</span>
                <div class="toolbar-heart__list__item--color" style="background-image: ${obj.color}"></div>
                <p class="toolbar-heart__list__item--delete">&#10005;</p>
            </div>
        `;
        listSummary.insertAdjacentHTML('beforeend', listItem);
    }
}

const likeColor = async (element) => {
    const color = element.parentNode.parentNode.parentNode.parentNode;
    const colorID = color.id;
    addToList(color);

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

const loadColors = async () => {
    page += 1;
    await axios({
        method: 'GET',
        url: `?page=${page}`
    }).then(res => {
        const colorContainer = document.getElementById('main__content');
        for (let i = 0; i < res.data.colors.length; i++) {
            let title = res.data.colors[i].title;
            let colorID = res.data.colors[i]._id;
            let hexcode1 = res.data.colors[i].colors[0].toUpperCase();
            let hexcode2 = res.data.colors[i].colors[1].toUpperCase();
            const colorComponent = `
            <div class="color" id=${colorID}>
                        <p class="color__title">
                        ${title}
                        </p>
                        <div class="color__container">
                            <div class="color__shape" 
                                style="background-image: linear-gradient(to bottom, #${hexcode1}, #${hexcode2})" onclick="openOverlay(this)"
                            ></div>
                            <div class="color__side">
                                <div class="color__hexcodes">
                                    <span class="color__hexcode" onmouseover="colorMouseOver(this);" onmouseout="colorMouseOut(this);" onclick="colorMouseClick(this);">${hexcode1}</span>
                                    <span class="color__hexcode" onmouseover="colorMouseOver(this);" onmouseout="colorMouseOut(this);" onclick="colorMouseClick(this);">${hexcode2}</span>
                                </div>
                                <div class="color__side--divider"></div>
                                <div class="color__likes scale"><img src="../img/likes.svg" alt="Likes icon" onclick="likeColor(this)"></div>
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