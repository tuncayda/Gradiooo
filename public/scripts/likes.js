let likes = 0;
let likesList = new Map();

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
    let likesCount = document.getElementById('likesCount');
    let obj = getChildNodes(color);
    console.log(obj)
    if (!likesList.has(color.id)) {
        likesList.set(color.id, obj );
        likes += 1;
        likesCount.textContent = likes;
        let likesDropdown = document.getElementById('likes-list');
        const listItem = `
        <div class='toolbar-likes__list-item'>
            <span class='toolbar-likes__list-item--title'>${obj.title}</span>
            <div class='toolbar-likes__list-item--color' style='background: ${obj.color}'></div>
        </div>
        `;
        likesDropdown.insertAdjacentHTML('beforeend', listItem);
    }
}