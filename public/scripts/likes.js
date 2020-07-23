let likes = 0;
let likesList = new Map();

if (likes === 0) {
    document.querySelector('.toolbar-likes').classList.add('hidden');
}

function toggleLikesList() {
    let likesList = document.querySelector('.toolbar-likes__list');

    if(likesList.classList.contains('hidden')) {
         likesList.classList.remove('hidden')
         likesList.classList.add('visible')
    } else {
        likesList.classList.add('hidden');
    }
}

function moreInfo(e) {
    e.getElementsByClassName('toolbar-likes__list-item--hexcodes')[0].classList.add('visible');
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
    let hexcodes = node.getElementsByClassName('color__hexcodes')[0];
    let n = hexcodes.children.length;
    let hexArray = [n];
    for (let i = 0; i < n; i++) {
        hexArray[i] = hexcodes.children[i].innerText;
    }

    return {
        'title': truncateString(node.getElementsByClassName('color__title')[0].innerText, charLimit),
        'color': node.getElementsByClassName('color__shape')[0].style.backgroundImage,
        'hexcodes': hexArray
    }
}

function addToList(color) {
    let toolbarLikes = document.querySelector('.toolbar-likes');
    if (toolbarLikes.classList.contains('hidden')) {
        toolbarLikes.classList.remove('hidden');
        toolbarLikes.classList.add('visible');
    }

    let likesCount = document.getElementById('likesCount');
    let obj = getChildNodes(color);
    if (!likesList.has(color.id)) {
        likesList.set(color.id, obj );
        likes += 1;
        likesCount.textContent = likes;
        let likesDropdown = document.getElementById('likes-list');
        const listItem = `
        <div class='toolbar-likes__list-item' onclick='moreInfo(this)' id='${color.id}'>
            <span class='toolbar-likes__list-item--title'>${obj.title}</span>
            <div class='toolbar-likes__list-item--color' style='background: ${obj.color}'></div>
        </div>
        `;
        likesDropdown.insertAdjacentHTML('beforeend', listItem);
    }

}
