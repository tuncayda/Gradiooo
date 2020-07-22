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

const likeColor = async (element) => {
    const color = element.parentNode.parentNode.parentNode.parentNode;
    const colorID = color.id;

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