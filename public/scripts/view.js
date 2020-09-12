// Remember if user had column or row view in the previous session
if (localStorage.getItem('view') === 'column') {
    columnView();
}

function columnView() {
    let main = document.getElementById('main__content');
    main.classList.add('column');
    localStorage.setItem('view', 'column');
}

function rowView() {
    let main = document.getElementById('main__content');
    main.classList.remove('column');
    localStorage.removeItem('view');
}

// let colorView = document.getElementById('colorView');
// colorView.addEventListener('click', e => {
//     let dropdownItem = e.target.closest('.dropdown__item');
//     dropdownItem.parentNode.childNodes.forEach(e => {
//         e.classList.remove('dropdown__item--selected');
//     });
//     dropdownItem.classList.toggle('dropdown__item--selected');
// })