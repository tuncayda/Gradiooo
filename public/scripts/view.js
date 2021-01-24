// Remember if user had column or row view in the previous session
if (localStorage.getItem('view') === 'column') {
    columnView();
}

/**
 * Show the colors in a column view
 */
function columnView() {
    let main = document.getElementById('main__content');
    main.classList.add('column');
    localStorage.setItem('view', 'column');
}

/**
 * Show one color per row
 */
function rowView() {
    let main = document.getElementById('main__content');
    main.classList.remove('column');
    localStorage.removeItem('view');
}