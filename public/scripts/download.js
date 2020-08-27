/**
 * Convert canvas to an image with specified type (e.g. png and jpeg)
 */
function canvasToImg(color, imageType = 'png') {

    // Extract the hex values from the div
    let hexcodes = getHexcodes(color);

    // Set the width and height of the canvas
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    canvas.clientWidth = window.innerWidth;
    canvas.clientHeight = window.innerHeight;

    // Give the canvas gradient
    let gradient = context.createLinearGradient(canvas.width/2,0,canvas.width/2,canvas.height); // Top to bottom
    gradient.addColorStop(0, `#${hexcodes[1].innerText}`);
    gradient.addColorStop(1, `#${hexcodes[2].innerText}`);
    context.fillStyle = gradient;
    context.fillRect(0,0,1200, 1200);

    // Convert canvas to image
    let image = canvas.toDataURL(`image/${imageType};`);

    // Set title attribute
    let colorTitle = color.closest('.color').getElementsByClassName('color__title')[0].innerText;
    color.setAttribute('download', colorTitle);
    color.setAttribute('href', image);
}

/**
 * Extract the hex values from a color div
 * Return an array with the hex values
 */
function getHexcodes(color) {
    // Find the div that contains the hex values for the colors
    let hexcodes = color.closest('.color').getElementsByClassName('color__hexcodes')[0];

    // Loop through the colors in the div and push the values to an array
    let hexcodesArr = [hexcodes.length];
    for (let i = 0; i < hexcodes.children.length; i++) {
        hexcodesArr.push(hexcodes.children[i]);
    }

    return hexcodesArr;
}