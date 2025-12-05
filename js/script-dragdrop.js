// Draggable Overlay
const overlay = document.getElementById('overlay');
const overlayHeader = document.getElementById('overlay-header');

function centerOverlay() {
    const overlayWidth = overlay.offsetWidth;
    const overlayHeight = overlay.offsetHeight;
    overlay.style.left = (window.innerWidth - overlayWidth) / 2 + 'px';
    overlay.style.top = (window.innerHeight - overlayHeight) / 2 + 'px';
}

// Center the overlay on load and resize
window.addEventListener('load', centerOverlay);
window.addEventListener('resize', centerOverlay);

let isDragging = false;
let offsetX, offsetY;

overlayHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    // Use getBoundingClientRect to handle transforms if they are ever re-introduced
    const rect = overlay.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    overlay.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Boundary checks
    const overlayWidth = overlay.offsetWidth;
    const overlayHeight = overlay.offsetHeight;
    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX + overlayWidth > window.innerWidth) newX = window.innerWidth - overlayWidth;
    if (newY + overlayHeight > window.innerHeight) newY = window.innerHeight - overlayHeight;

    overlay.style.left = newX + 'px';
    overlay.style.top = newY + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    overlay.style.cursor = 'default';
});