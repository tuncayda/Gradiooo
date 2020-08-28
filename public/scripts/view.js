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