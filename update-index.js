const fs = require('fs');
const path = require('path');

// Read input parameters (file paths)
const reposFile = process.argv[2];
const htmlFile = process.argv[3];

// Load the pinned repositories JSON data
const pinnedRepos = JSON.parse(fs.readFileSync(reposFile, 'utf-8'));

// Read the HTML template
let htmlContent = fs.readFileSync(htmlFile, 'utf-8');

// Define a function to generate the HTML for each project
const generateProjectCard = (repo) => {
    return `
    <div class="project-card">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description available'}</p>
        <div class="project-links">
            <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
                View Project
            </a>
        </div>
        <div class="tech-tags">
            <span class="tech-tag">${repo.primaryLanguage?.name || 'Various'}</span>
            <span class="tech-tag">⭐ ${repo.stargazerCount}</span>
            <span class="tech-tag">🍴 ${repo.forkCount}</span>
        </div>
    </div>`;
};

// Insert the project cards into the HTML template
let projectCardsHTML = pinnedRepos.data.user.pinnedItems.nodes
    .map(generateProjectCard)
    .join('');

htmlContent = htmlContent.replace('<!-- Pinned Projects Here -->', projectCardsHTML);

// Write the updated HTML back to the file
fs.writeFileSync(htmlFile, htmlContent);

console.log('index.html has been updated with pinned repositories.');
