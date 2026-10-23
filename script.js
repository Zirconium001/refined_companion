const track = document.getElementById("image-track");
const images = track.getElementsByClassName("image");

let isDragging = false;
let startX = 0;
let startPercentage = 0;
let currentPercentage = 0;

function dragStart(e) {
    isDragging = true;
    startX = e.type. includes("touch") ? e.touches[0].clientX : e.clientX;
    startPercentage = currentPercentage;
}

function dragMove(e) {
    if (!isDragging) return;

    const currentX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
    const delta = currentX - startX;

    // Convert delta to percentage (0.5 display = full rotation)
    let nextPercentage = startPercentage + (delta / (window.innerWidth / 2)) * 100;

    // Calculate limits for track movement
    const imageWidthPx = (40 * window.innerHeight) / 100;
    const gapPx = (4 * window.innerHeight) / 100;
    const totalTrackWidth = images. length * (imageWidthPx + gapPx);
    const minPercentage = -((totalTrackWidth - window.innerWidth * 0.5) / window.innerWidth) * 100;
    const maxPercentage = 0;

    // Clamp to valid range
    nextPercentage = Math.min(Math.max(nextPercentage, minPercentage), maxPercentage);

    // Apply transform to track
    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    // Apply objectPosition to images (parallax effect within portrait)
    // This moves the image INSIDE the portrait frame
    const objectPos = 100 + nextPercentage;
    
    for (const img of images) {
        img.style.objectPosition = `${objectPos}% 50%`;
    }

    currentPercentage = nextPercentage;
}

function dragEnd() {
    isDragging = false;
}

// Desktop events
track.addEventListener("mousedown", dragStart);
window.addEventListener("mousemove", dragMove);
window.addEventListener("mouseup", dragEnd);

// Mobile events
track.addEventListener("touchstart", dragStart, { passive: true });
window.addEventListener("touchmove", dragMove, { passive: false });
window.addEventListener("touchend", dragEnd);