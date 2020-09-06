let shapesDropdownItems = document.getElementById('shapes').getElementsByClassName('dropdown__items')[0].childNodes;
shapesDropdownItems.forEach(e => {
    e.addEventListener('click', shape => {
        filterOnShape(shape);
    })
})

function filterOnShape(shape) {
    
}