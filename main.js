const generateBtn = document.getElementById('generate-btn');
const numberElements = document.querySelectorAll('.number');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeToggleIcon = themeToggle.querySelector('i');

// --- Theme Management ---
function applyTheme(theme) {
    body.classList.toggle('dark-mode', theme === 'dark-mode');
    themeToggleIcon.classList.toggle('fa-moon', theme === 'dark-mode');
    themeToggleIcon.classList.toggle('fa-sun', theme !== 'dark-mode');
    localStorage.setItem('theme', theme);
}

// Check for saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

applyTheme(savedTheme || (prefersDark ? 'dark-mode' : 'light-mode'));

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) { // Only if no theme is manually set
        applyTheme(e.matches ? 'dark-mode' : 'light-mode');
    }
});

// Theme toggle button
themeToggle.addEventListener('click', () => {
    applyTheme(body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode');
});


// --- Lotto Number Generation ---
function getNumberCategory(number) {
    if (number <= 10) return 'yellow';
    if (number <= 20) return 'blue';
    if (number <= 30) return 'red';
    if (number <= 40) return 'gray';
    return 'green';
}

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    numberElements.forEach((element, index) => {
        const number = sortedNumbers[index];
        element.textContent = number;
        element.dataset.category = getNumberCategory(number);
    });
}

// Generate numbers on button click
generateBtn.addEventListener('click', generateNumbers);

// Generate numbers on initial load
document.addEventListener('DOMContentLoaded', generateNumbers);
