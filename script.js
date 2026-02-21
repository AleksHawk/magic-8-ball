const answers = [
    "IT IS CERTAIN", "WITHOUT A DOUBT", "STARS SAY YES", "YOU MAY RELY ON IT", "AS I SEE IT, YES",
    "REPLY HAZY, TRY AGAIN", "ASK AGAIN LATER", "CANNOT PREDICT NOW", "CONCENTRATE AND ASK AGAIN",
    "DON'T COUNT ON IT", "MY REPLY IS NO", "MY SOURCES SAY NO", "OUTLOOK NOT SO GOOD", "CHANCES ARE SLIM"
];

const ball = document.getElementById('magic-ball');
const eightLogo = document.getElementById('eight');
const triangle = document.getElementById('triangle');
const answerText = document.getElementById('answer');
const downloadBtn = document.getElementById('download-btn');
const instructionsBox = document.getElementById('instructions-box');
const screenshotExport = document.getElementById('screenshot-export');
const bigAnswerText = document.getElementById('screenshot-big-answer');
const smallAnswerText = document.getElementById('screenshot-small-answer');

const soundShake = document.getElementById('sound-shake');
const soundReveal = document.getElementById('sound-reveal');
soundShake.volume = 0.5;
soundReveal.volume = 0.6;

ball.addEventListener('click', () => {
    soundShake.currentTime = 0;
    soundShake.play().catch(e => console.log(e));

    triangle.classList.add('hidden');
    eightLogo.classList.remove('hidden');
    downloadBtn.classList.add('hidden');
    
    if (instructionsBox) instructionsBox.classList.add('hidden');

    ball.classList.add('shake');

    setTimeout(() => {
        ball.classList.remove('shake');
        
        const randomIndex = Math.floor(Math.random() * answers.length);
        const selectedAnswer = answers[randomIndex];
        
        answerText.innerText = selectedAnswer;
        bigAnswerText.innerText = selectedAnswer;
        smallAnswerText.innerText = selectedAnswer;

        soundReveal.currentTime = 0;
        soundReveal.play().catch(e => console.log(e));

        eightLogo.classList.add('hidden');
        triangle.classList.remove('hidden');
        
        downloadBtn.classList.remove('hidden');
    }, 600);
});

downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "DIVINING..."; 
    
    html2canvas(screenshotExport, {
        backgroundColor: "#050011", 
        scale: 2, 
        useCORS: true, 
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'MagicBlock-Oracle.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        downloadBtn.innerText = originalText;
    });
});

let throttleTimer;
document.addEventListener('mousemove', (e) => {
    if (throttleTimer) return;
    throttleTimer = setTimeout(() => throttleTimer = null, 40);

    createSparkle(e.pageX, e.pageY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;

    sparkle.style.left = `${x + offsetX}px`;
    sparkle.style.top = `${y + offsetY}px`;
    
    const size = Math.random() * 5 + 3;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 800);
}
