// --- Constants and Global Variables ---
const URL = "https://teachablemachine.withgoogle.com/models/75JjQQ-Jz/";
let model, labelContainer, maxPredictions;

// --- Elements ---
const generateBtn = document.getElementById('generate-btn');
const numberElements = document.querySelectorAll('.number');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeToggleIcon = themeToggle.querySelector('i');

const uploadArea = document.getElementById('upload-area');
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');
const previewContainer = document.getElementById('image-preview-container');
const resultContainer = document.getElementById('result-container');
const loadingSpinner = document.getElementById('loading-spinner');
const retryBtn = document.getElementById('retry-btn');

// --- Theme Management ---
function applyTheme(theme) {
    body.classList.toggle('dark-mode', theme === 'dark-mode');
    themeToggleIcon.classList.toggle('fa-moon', theme === 'dark-mode');
    themeToggleIcon.classList.toggle('fa-sun', theme !== 'dark-mode');
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark-mode' : 'light-mode'));

themeToggle.addEventListener('click', () => {
    applyTheme(body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode');
});

// --- Animal Face Test (Teachable Machine) ---

// Load the model
async function initModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    labelContainer = document.getElementById("label-container");
}

// Handle Image Upload
uploadArea.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            showPreview();
            predict();
        };
        reader.readAsDataURL(file);
    }
});

// Drag and Drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = 'rgba(74, 105, 189, 0.1)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.backgroundColor = 'transparent';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = 'transparent';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            showPreview();
            predict();
        };
        reader.readAsDataURL(file);
    }
});

function showPreview() {
    uploadArea.style.display = 'none';
    previewContainer.style.display = 'block';
    loadingSpinner.style.display = 'block';
    resultContainer.style.display = 'none';
}

async function predict() {
    if (!model) await initModel();
    
    const prediction = await model.predict(imagePreview);
    loadingSpinner.style.display = 'none';
    resultContainer.style.display = 'block';
    
    labelContainer.innerHTML = '';
    
    // Sort predictions by probability
    prediction.sort((a, b) => b.probability - a.probability);

    prediction.forEach(p => {
        const percent = (p.probability * 100).toFixed(0);
        const barHtml = `
            <div class="result-bar-wrapper">
                <div class="result-label">
                    <span>${translateLabel(p.className)}</span>
                    <span>${percent}%</span>
                </div>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${percent}%"></div>
                </div>
            </div>
        `;
        labelContainer.innerHTML += barHtml;
    });

    const topResult = prediction[0].className;
    document.getElementById('result-title').textContent = `당신은 '${translateLabel(topResult)}' 상입니다!`;
}

function translateLabel(label) {
    const translations = {
        'dog': '강아지',
        'cat': '고양이',
        'rabbit': '토끼',
        'dinosaur': '공룡',
        'bear': '곰'
    };
    return translations[label.toLowerCase()] || label;
}

retryBtn.addEventListener('click', () => {
    uploadArea.style.display = 'block';
    previewContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    imageInput.value = '';
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

generateBtn.addEventListener('click', generateNumbers);
document.addEventListener('DOMContentLoaded', () => {
    generateNumbers();
    initModel(); // Pre-load model
});

// --- Formspree Contact Form Handling ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = '보내는 중...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                formStatus.textContent = "감사합니다! 문의가 성공적으로 전송되었습니다.";
                formStatus.className = "success";
                contactForm.reset();
            } else {
                formStatus.textContent = "죄송합니다. 오류가 발생했습니다.";
                formStatus.className = "error";
            }
        } catch (error) {
            formStatus.textContent = "네트워크 오류가 발생했습니다.";
            formStatus.className = "error";
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
