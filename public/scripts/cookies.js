let visited = localStorage.getItem('visited');
if (visited === null) {
    let cookiesButton = document.querySelector('.cookies__button');
    let cookiesBar = cookiesButton.parentNode;
    cookiesBar.style = 'visibility: visible;'
    
    cookiesButton.addEventListener('click', e => {
        cookiesBar.style = 'visibility: hidden;'
    });
    
    localStorage.setItem('visited', 'true');
}