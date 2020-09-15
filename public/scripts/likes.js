let likes = 0;
let likesList = new Map();

let toolbarLikes = document.querySelector('.toolbar-likes');
let likesDropdown = document.querySelector('.toolbar-likes__list');

document.addEventListener('click', event => {
    let target = event.target;
    if (
        target.id !== likesDropdown.id && 
        target.id !== 'heart-icon' && 
        target.id !== 'likesCount' &&
        target.className !== 'toolbar-likes__list-item' &&
        target.className !== 'toolbar-likes__list-item--color' &&
        target.className !== 'toolbar-likes__list-item--title' &&
        target.className !== 'toolbar-likes__list-item--hexcodes' &&
        target.className !== 'toolbar-likes__list-item--delete' &&
        target.className !== 'toolbar-likes__likes-item--hexcode' &&
        target.className !== 'delete-icon' &&
        target.className !== 'like') {
            likesDropdown.classList.remove('visible');
            likesDropdown.classList.add('hidden');
    }
})

if (likes === 0) {
    toolbarLikes.classList.add('hidden');
}

function toggleLikesList() {
    let likesList = document.querySelector('.toolbar-likes__list');

    if(likesList.classList.contains('hidden')) {
         likesList.classList.remove('hidden');
         likesList.style = 'height: 30rem';
         likesList.classList.add('visible');
    } else {
        likesList.classList.remove('visible');
        likesList.style = 'height: 0';
        likesList.classList.add('hidden');
    }
}

function truncateString(str, num) {
    if (str.length <= num) {
        return str;
    } else {
        return str.slice(0, num) + '...'
    }
}

function getChildNodes(node) {
    let hexcodes = node.getElementsByClassName('color__hexcodes')[0];
    let n = hexcodes.children.length;
    let hexArray = [n];
    for (let i = 0; i < n; i++) {
        hexArray[i] = hexcodes.children[i].innerText;
    }
    
    const charLimit = 16;
    return {
        'title': truncateString(node.getElementsByClassName('color__title')[0].innerText, charLimit),
        'color': node.getElementsByClassName('color__shape')[0].style.backgroundImage,
        'hexcodes': hexArray
    }
}

function deleteItem(node) {
    let color = node.parentNode;
    likesList.delete(color.id);
    localStorage.removeItem(color.id);
    document.getElementById('likesCount').textContent = likesList.size;
    let colorArr = document.getElementsByClassName('color');
    for (let i = 0; i < colorArr.length; i++) {
        if (colorArr[i].id == color.id) {
            colorArr[i].getElementsByClassName('like')[0].src = '../img/likes.svg';
            break;
        }
    }
    if (likesList.size == 0) { 
        toolbarLikes.classList.add('hidden');
        likesDropdown.classList.add('hidden');
    }
    color.style.display = 'none';
}

for (let i = 0; i < localStorage.length; i++) {
    let id = localStorage.key(i);
    addInit(id, JSON.parse(localStorage.getItem(id)));
}

function addInit(id, obj) {
    if (!likesList.has(id)) {
        let toolbarLikes = document.querySelector('.toolbar-likes');
        if (toolbarLikes.classList.contains('hidden')) {
            toolbarLikes.classList.remove('hidden');
            toolbarLikes.classList.add('visible');
        }
        let likesCount = document.getElementById('likesCount');
        if (!likesList.has(id)) {
            likesList.set(id, obj);
            likesCount.textContent = likesList.size;
            let likesDropdown = document.getElementById('likes-list');
            let listItem;
            if (obj.hexcodes[1] === '') {
                listItem = `
                <div class='toolbar-likes__list-item' id='${id}'>
                    <span class='toolbar-likes__list-item--title'>${obj.title}</span>
                    <div class='toolbar-likes__list-item--hexcodes'>
                        <span class='toolbar-likes__likes-item--hexcode'>#${obj.hexcodes[0]}</span>
                    </div>
                    <div class='toolbar-likes__list-item--color' style='background-color: #${obj.hexcodes[0]}'></div>
                    <div class='toolbar-likes__list-item--delete' onclick='deleteItem(this)' title='Remove color'>
                        <span class='delete-icon'>&#10005;</span>
                    </div>
                </div>
                `;
            } else {
                listItem = `
                <div class='toolbar-likes__list-item' id='${id}'>
                    <span class='toolbar-likes__list-item--title'>${obj.title}</span>
                    <div class='toolbar-likes__list-item--hexcodes'>
                        <span class='toolbar-likes__likes-item--hexcode'>#${obj.hexcodes[0]} #${obj.hexcodes[1]}</span>
                    </div>
                    <div class='toolbar-likes__list-item--color' style='background: ${obj.color}'></div>
                    <div class='toolbar-likes__list-item--delete' onclick='deleteItem(this)' title='Remove color'>
                        <span class='delete-icon'>&#10005;</span>
                    </div>
                </div>
                `;
            }
            likesDropdown.insertAdjacentHTML('beforeend', listItem);
        }
    }
    let colorArr = document.getElementsByClassName('color');
    for (let i = 0; i < colorArr.length; i++) {
        if (colorArr[i].id == id) {
            colorArr[i].getElementsByClassName('like')[0].src = '../img/likes-clicked.svg';
            break;
        }
    }
}

function addToList(color) {
    if (!likesList.has(color.id)) {
        let toolbarLikes = document.querySelector('.toolbar-likes');
        if (toolbarLikes.classList.contains('hidden')) {
            toolbarLikes.classList.remove('hidden');
            toolbarLikes.classList.add('visible');
        }
        let likesCount = document.getElementById('likesCount');
        let obj = getChildNodes(color);
        if (!likesList.has(color.id)) {
            likesList.set(color.id, obj);
            window.localStorage.setItem(color.id, JSON.stringify(obj));
            if (likesList.size > 99) {
                likesCount.textContent = '99+';
            } else {
                likesCount.textContent = likesList.size;
            }
            let likesDropdown = document.getElementById('likes-list');
            let listItem;
            if (obj.hexcodes[1] === '') {
                listItem = `
                <div class='toolbar-likes__list-item' id='${color.id}'>
                    <span class='toolbar-likes__list-item--title'>${obj.title}</span>
                    <div class='toolbar-likes__list-item--hexcodes'>
                        <span class='toolbar-likes__likes-item--hexcode'>#${obj.hexcodes[0]}</span>
                    </div>
                    <div class='toolbar-likes__list-item--color' style='background-color: #${obj.hexcodes[0]}'></div>
                    <div class='toolbar-likes__list-item--delete' onclick='deleteItem(this)'>
                        <span class='delete-icon'>&#10005;</span>
                    </div>
                </div>
                `;
            } else {
                listItem = `
                <div class='toolbar-likes__list-item' id='${color.id}'>
                    <span class='toolbar-likes__list-item--title'>${obj.title}</span>
                    <div class='toolbar-likes__list-item--hexcodes'>
                        <span class='toolbar-likes__likes-item--hexcode'>#${obj.hexcodes[0]} #${obj.hexcodes[1]}</span>
                    </div>
                    <div class='toolbar-likes__list-item--color' style='background: ${obj.color}'></div>
                    <div class='toolbar-likes__list-item--delete' onclick='deleteItem(this)'>
                        <span class='delete-icon'>&#10005;</span>
                    </div>
                </div>
                `;
            }
            likesDropdown.insertAdjacentHTML('beforeend', listItem);
        }
        color.getElementsByClassName('like')[0].src = '../img/likes-clicked.svg';
    } else {
        let list = document.querySelector('.toolbar-likes__list');
        for (let i = 0; i < list.children.length; i++) {
            if (list.children[i].id == color.id) {
                list.children[i].style.display = 'none';
                color.getElementsByClassName('like')[0].src = '../img/likes.svg';
                likesList.delete(color.id);
                localStorage.removeItem(color.id);
                document.getElementById('likesCount').textContent = likesList.size;
            }
        }
        if (likesList.size == 0) { 
            toolbarLikes.classList.add('hidden');
            likesDropdown.classList.add('hidden');
        }
    }
}