document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    let hasScrolled = false;

    // Function to play audio
    function playAudio() {
        if (!hasScrolled) {
            audio.play().then(() => {
                console.log("Audio started playing");
                hasScrolled = true;
            }).catch(error => {
                console.log("Error playing audio:", error);
            });
        }
    }

    // Listen for scroll event
    window.addEventListener('scroll', function() {
        requestAnimationFrame(playAudio);
    }, { passive: true });

    // Optional: Add a small delay before trying to play
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 1000);
});
