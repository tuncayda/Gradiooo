
// function truncateString(str, num) {
//     if (str.length <= num) {
//         return str;
//     } else {
//         return str.slice(0, num) + '...'
//     }
// }

// function getChildNodes(node) {
//     const charLimit = 12;

//     return {
//         'title': truncateString(node.getElementsByClassName('color__title')[0].innerText, charLimit),
//         'color': node.getElementsByClassName('color__shape')[0].style.backgroundImage 
//     }
// }

// function addToList(color) {
//     let list = document.getElementById('colorList');
//     let obj = getChildNodes(color);
//     if (!likedList.has(color.id)) {
//         likedList.set(color.id, obj );
//         liked += 1;
//         list.textContent = liked;
//         let listSummary = document.getElementById('liked-list');
//         const listItem = `
//             <div class="toolbar-heart__list__item" onclick="deleteListItem(this)">
//                 <span>${obj.title}</span>
//                 <div class="toolbar-heart__list__item--color" style="background-image: ${obj.color}"></div>
//                 <p class="toolbar-heart__list__item--delete">&#10005;</p>
//             </div>
//         `;
//         listSummary.insertAdjacentHTML('beforeend', listItem);
//     }
// }