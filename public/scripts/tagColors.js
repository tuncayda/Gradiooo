// Get the container of the colors
let dropdownColors = document.querySelector('.dropdown__colors');

// Add eventlistener to the container
dropdownColors.addEventListener('click', (event) => {
    let target = event.target;
    if (target.classList.contains('dropdown__circle')) {
        target.classList.toggle('dropdown__circle--selected');
    }
})