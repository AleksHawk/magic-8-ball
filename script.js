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
const captureArea = document.getElementById('capture-area');
const posterText = document.getElementById('poster-text');
const posterAnswerResult = document.getElementById('poster-answer-result');

const soundShake = document.getElementById('sound-shake');
const soundReveal = document.getElementById('sound-reveal');

function playSound(sound) {
    try {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    } catch(e) {}
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
        posterAnswerResult.innerText = finalAnswer;

        playSound(soundReveal);

        eight.classList.add('hidden');
        triangle.classList.remove('hidden');
        
        downloadBtn.classList.remove('hidden');
    }, 500);
});

downloadBtn.addEventListener('click', async () => {
    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "PREPARING..."; 
    downloadBtn.style.opacity = '0.5';

    // 1. Готуємо контейнер до зйомки (показуємо текст, робимо відступи)
    posterText.classList.remove('hidden');
    captureArea.classList.add('capture-mode');

    // Даємо браузеру 200 мілісекунд, щоб він застосував стилі перед скріншотом
    await new Promise(resolve => setTimeout(resolve, 200));

    // 2. Робимо скріншот. Scale: 2 (краще для пам'яті телефону, ніж 3)
    html2canvas(captureArea, {
        backgroundColor: "#050011", 
        scale: 2, 
        useCORS: true,
        logging: false
    }).then(canvas => {
        // 3. Завантажуємо
        const link = document.createElement('a');
        link.download = 'MagicBlock-Oracle.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // 4. Повертаємо сайт у початковий вигляд
        posterText.classList.add('hidden');
        captureArea.classList.remove('capture-mode');
        downloadBtn.innerText = originalText;
        downloadBtn.style.opacity = '1';
    }).catch(err => {
        console.error("Screenshot failed:", err);
        posterText.classList.add('hidden');
        captureArea.classList.remove('capture-mode');
        downloadBtn.innerText = "ERROR. TRY AGAIN";
        downloadBtn.style.opacity = '1';
    });
});
