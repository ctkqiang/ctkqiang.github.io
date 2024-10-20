document.addEventListener('DOMContentLoaded', function() {
    const lines = document.querySelectorAll('.terminal-line');
    let delay = 0;
    const increment = 1000; // 1 second between each line

    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('visible');
        }, delay);
        delay += increment;
    });
});
