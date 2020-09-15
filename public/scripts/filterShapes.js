let shapes = document.getElementById('shapes');

shapes.addEventListener('click', e => {
    filterShapes(e.target.getAttribute('data-shape'), e);
})

let filteredShapes = new Array();

function filterShapes(shapeType, dropdownItem) {
    if (!filteredShapes.includes(shapeType)) {
        filteredShapes.push(shapeType);
        dropdownItem.target.closest('.dropdown__item').classList.toggle('dropdown__item--selected');
    } else {
        dropdownItem.target.closest('.dropdown__item').classList.toggle('dropdown__item--selected');
        filteredShapes.splice(filteredShapes.indexOf(shapeType), 1);
    }
    let mainContent = document.getElementById('main__content').childNodes;
    mainContent.forEach(e => {
        let tag = e.getAttribute('data-shape');
        if (!filteredShapes.includes(tag)) {
            e.classList.add('remove');
        } else {
            e.classList.remove('remove');
        }
    })
    if (filteredShapes.length === 0) {
        mainContent.forEach(e => {
            e.classList.remove('remove');
        })
    }
}