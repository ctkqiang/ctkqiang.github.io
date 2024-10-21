document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    let hasScrolled = false;

    audio.volume = 0.4;

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


document.addEventListener('DOMContentLoaded', function() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const jumpscareElement = document.getElementById('jumpscare');
    const jumpscareSound = new Audio('../assets/sf.mp3');

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            let output = '';

            switch(command) {
                case 'help':
                    output = 'Available commands: help, ls, pwd, whoami, clear, queen';
                    break;
                case 'ls':
                    output = 'classified_files  research_data  t-virus  g-virus  nemesis_ai';
                    break;
                case 'pwd':
                    output = '/home/umbrella/secret_lab';
                    break;
                case 'whoami':
                    output = 'CHENG TZE KEONG - Senior Software Engineer';
                    break;
                case 'clear':
                    terminalOutput.innerHTML = '';
                    this.value = '';
                    return;
                case 'queen':
                    triggerJumpscare();
                    return;
                default:
                    output = `Command not found: ${command}. Type 'help' for available commands.`;
            }

            terminalOutput.innerHTML += `<div>umbrella@redqueen:~$ ${command}</div><div>${output}</div>`;
            this.value = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    function triggerJumpscare() {
        jumpscareSound.play();
        jumpscareElement.classList.add('active');
        setTimeout(() => {
            jumpscareElement.classList.remove('active');
        }, 3000); // Remove jumpscare after 3 seconds
    }
});
