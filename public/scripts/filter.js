let dropdownColors = document.querySelectorAll('.dropdown__circle');
dropdownColors.forEach(e => {
    e.addEventListener('click', tag => {
        filterColor(tag, e);
    });
});

let filtered = new Array();

function filterColor(color, e) {
    if (!filtered.includes(color.target.id)) {
        filtered.push(color.target.id);
        e.style = 'border: 2px solid black';
    } else {
        e.style = 'border: none';
        filtered.splice(filtered.indexOf(color.target.id), 1);
    }
    let mainContent = document.getElementById('main__content').childNodes;
    mainContent.forEach(e => {
        let tag = e.getAttribute('data-tag');
        if (!filtered.includes(tag)) {
            e.classList.add('remove');
        } else {
            e.classList.remove('remove');
        }
    })
    if (filtered.length === 0) {
        mainContent.forEach(e => {
            e.classList.remove('remove');
        })
    }
}