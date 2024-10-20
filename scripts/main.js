const terminalLines = [
  ">> Initiating developer profile scan...",
  ">> Accessing secure database...",
  ">> Decrypting encrypted files...",
  ">> Bypassing firewalls...",
  ">> Retrieving classified information...",
  ">> Compiling developer data...",
  ">> Verifying security clearance...",
  ">> Access granted. Developer profile unlocked.",
  ">> WARNING: This information is highly classified. Unauthorized access will result in immediate termination."
];

const terminal = document.getElementById('terminal');
let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex < terminalLines.length) {
    if (charIndex < terminalLines[lineIndex].length) {
      terminal.innerHTML += terminalLines[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, 50); // Adjust typing speed here
    } else {
      terminal.innerHTML += '<br>';
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, 500); // Delay before next line
    }
  }
}

typeLine();
