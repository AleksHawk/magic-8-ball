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

const soundShake = document.getElementById('sound-shake');
const soundReveal = document.getElementById('sound-reveal');
soundShake.volume = 0.5;
soundReveal.volume = 0.7;

ball.addEventListener('click', () => {
    // Безпечний запуск звуку (не зламає сайт, якщо браузер заблокує аудіо)
    try {
        soundShake.currentTime = 0;
        soundShake.play().catch(e => console.log("Audio blocked by browser"));
    } catch(e) {}

    triangle.classList.add('hidden');
    eight.classList.remove('hidden');
    downloadBtn.classList.add('hidden');
    
    ball.classList.add('shake');

    setTimeout(() => {
        ball.classList.remove('shake');
        
        const randomIndex = Math.floor(Math.random() * answers.length);
        answerText.innerText = answers[randomIndex];

        try {
            soundReveal.currentTime = 0;
            soundReveal.play().catch(e => console.log("Audio blocked"));
        } catch(e) {}

        eight.classList.add('hidden');
        triangle.classList.remove('hidden');
        
        downloadBtn.classList.remove('hidden');
    }, 600);
});

// Створення красивого скріншоту для Twitter
downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "CREATING POST..."; 
    
    // Тимчасово ховаємо інструкцію, щоб вона не псувала картинку
    instructionsBox.style.opacity = '0';
    downloadBtn.style.opacity = '0';

    setTimeout(() => {
        html2canvas(captureArea, {
            backgroundColor: "#050011", 
            scale: 3, // Висока якість картинки
            useCORS: true, // Дозволяє малювати картинки з інших доменів (важливо для лого)
            allowTaint: true,
            logging: false,
            // Трохи розширюємо зону, щоб неонове світіння не обрізалось
            onclone: function (clonedDoc) {
                clonedDoc.getElementById('capture-area').style.padding = '40px';
            }
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'MagicBlock-Twitter-Post.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Повертаємо все як було
            instructionsBox.style.opacity = '1';
            downloadBtn.style.opacity = '1';
            downloadBtn.innerText = originalText;
        });
    }, 300); // Даємо 300 мілісекунд, щоб ефекти CSS встигли відмалюватись
});
