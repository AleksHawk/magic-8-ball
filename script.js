const answers = [
    "IT IS CERTAIN", "WITHOUT A DOUBT", "STARS SAY YES", "YOU MAY RELY ON IT", "AS I SEE IT, YES",
    "REPLY HAZY, TRY AGAIN", "ASK AGAIN LATER", "CANNOT PREDICT NOW", "CONCENTRATE AND ASK AGAIN",
    "DON'T COUNT ON IT", "MY REPLY IS NO", "MY SOURCES SAY NO", "OUTLOOK NOT SO GOOD", "CHANCES ARE SLIM"
];

const ball = document.getElementById('magic-ball');
const eight = document.getElementById('eight');
const triangle = document.getElementById('triangle');
const answerText = document.getElementById('answer');
const downloadBtn = document.getElementById('download-btn');
const instructionsBox = document.getElementById('instructions-box');
const captureArea = document.getElementById('capture-area');

// Елементи для скріншоту
const screenshotTextBlock = document.getElementById('screenshot-text-block');
const screenshotAnswerResult = document.getElementById('screenshot-answer-result');

const soundShake = document.getElementById('sound-shake');
const soundReveal = document.getElementById('sound-reveal');
soundShake.volume = 0.6;
soundReveal.volume = 0.8;

// Функція для безпечного відтворення звуку
function playSound(sound) {
    try {
        sound.currentTime = 0;
        sound.play().catch(e => console.warn("Audio play failed (likely browser policy):", e));
    } catch(e) { console.warn("Audio error:", e); }
}

ball.addEventListener('click', () => {
    playSound(soundShake);

    triangle.classList.add('hidden');
    eight.classList.remove('hidden');
    downloadBtn.classList.add('hidden');
    
    ball.classList.add('shake');

    setTimeout(() => {
        ball.classList.remove('shake');
        
        const randomIndex = Math.floor(Math.random() * answers.length);
        const finalAnswer = answers[randomIndex];
        answerText.innerText = finalAnswer;
        // Зберігаємо відповідь для скріншоту
        screenshotAnswerResult.innerText = finalAnswer;

        playSound(soundReveal);

        eight.classList.add('hidden');
        triangle.classList.remove('hidden');
        
        downloadBtn.classList.remove('hidden');
    }, 600);
});

downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "PREPARING POSTER..."; 
    
    // 1. Ховаємо інструкцію та кнопку
    instructionsBox.style.opacity = '0';
    downloadBtn.style.opacity = '0';
    
    // 2. Показуємо секретний текст для скріншоту
    screenshotTextBlock.classList.add('show-on-screenshot');

    setTimeout(() => {
        // Визначаємо розмір сторони квадрата на основі поточної ширини контейнера
        const sideSize = captureArea.offsetWidth;

        html2canvas(captureArea, {
            backgroundColor: "#050011", 
            scale: 3, // Висока якість
            useCORS: true,
            logging: false,
            // ПРИМУСОВИЙ КВАДРАТНИЙ РОЗМІР (1:1)
            width: sideSize,
            height: sideSize,
            windowWidth: sideSize,
            windowHeight: sideSize,
            // Центруємо контент у квадраті під час захвату
            onclone: function (clonedDoc) {
                const clonedArea = clonedDoc.getElementById('capture-area');
                clonedArea.style.height = sideSize + 'px';
                clonedArea.style.display = 'flex';
                clonedArea.style.flexDirection = 'column';
                clonedArea.style.justifyContent = 'center';
                clonedArea.style.padding = '20px';
            }
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'MagicBlock-Prediction-Poster.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // 3. Повертаємо все назад
            screenshotTextBlock.classList.remove('show-on-screenshot');
            instructionsBox.style.opacity = '1';
            downloadBtn.style.opacity = '1';
            downloadBtn.innerText = originalText;
        });
    }, 500); // Більша затримка, щоб стилі встигли застосуватись
});
