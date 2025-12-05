// Slideshow
const slideshowContainer = document.querySelector('.background-slideshow');
let images = []; // Will store dynamically loaded images
let currentImage = 0;

// Function to discover and load images
async function discoverAndLoadImages() {
    console.log('Starting image discovery...');
    // Loop from 1 to 10 to discover all images
    for (let i = 1; i <= 10; i++) {
        const imageUrl = `/images/slideshow/${i}.webp`;
        const img = new Image();
        img.src = imageUrl;

        await new Promise(resolve => {
            img.onload = () => {
                console.log(`Image loaded: ${imageUrl}`);
                images.push(img);
                slideshowContainer.appendChild(img);
                resolve();
            };
            img.onerror = () => {
                console.log(`Image not found or failed to load: ${imageUrl}`);
                resolve();
            };
        });
    }

    console.log(`Discovered ${images.length} images.`);

    // Initialize slideshow after all images are discovered
    if (images.length > 0) {
        // Temporarily disable transition for the first image to appear instantly
        images[0].style.transition = 'none';
        images[0].classList.add('active'); // Set first discovered image as active
        // Force reflow to apply styles instantly
        void images[0].offsetHeight;
        // Re-enable transition
        images[0].style.transition = '';

        console.log('First dynamically loaded image set to active instantly:', images[0]);

        // Hide the static first image AFTER the first dynamic image is active
        const staticFirstImage = document.getElementById('static-first-image');
        if (staticFirstImage) {
            staticFirstImage.style.display = 'none';
            console.log('Hidden static first image.');
        }

        setTimeout(() => {
            changeImage();
            setInterval(changeImage, 10000);
        }, 5000);
    } else {
        console.error('No images discovered for slideshow. Please ensure you have 1.webp to 10.webp in static/images/slideshow/.');
    }
}

function changeImage() {
    if (images.length === 0) {
        console.log('changeImage called but no images available.');
        return; // No images to display
    }

    // Ensure currentImage is always a valid index
    if (currentImage < 0 || currentImage >= images.length) {
        console.error(`Invalid currentImage index: ${currentImage}. Resetting to 0.`);
        currentImage = 0;
        if (images.length === 0) return; // Re-check in case images became empty
    }

    const prevImage = images[currentImage];
    if (!prevImage) { // Defensive check
        console.error(`prevImage is undefined at index ${currentImage}. Skipping transition.`);
        currentImage = (currentImage + 1) % images.length; // Try next image
        return;
    }
    prevImage.classList.remove('active');
    prevImage.classList.add('prev'); // Mark as previous
    console.log('Previous image:', prevImage);

    currentImage = (currentImage + 1) % images.length;
    const nextImage = images[currentImage];
    if (!nextImage) { // Defensive check
        console.error(`nextImage is undefined at index ${currentImage}. Skipping transition.`);
        return;
    }
    nextImage.classList.remove('prev'); // Ensure it's not marked as previous
    nextImage.classList.add('active'); // Make it active
    console.log('Next image:', nextImage);

    // After transition, remove prev class
    setTimeout(() => {
        if (prevImage) { // Defensive check
            prevImage.classList.remove('prev');
            console.log('Removed prev class from:', prevImage);
        }
    }, 1000); // Match transition duration
}

// Start discovery and loading
discoverAndLoadImages();