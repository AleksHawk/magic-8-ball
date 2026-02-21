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

ball.addEventListener('click', () => {
    triangle.classList.add('hidden');
    eight.classList.remove('hidden');
    downloadBtn.classList.add('hidden');
    
    if (instructionsBox) instructionsBox.classList.add('hidden');

    ball.classList.add('shake');

    setTimeout(() => {
        ball.classList.remove('shake');
        
        const randomIndex = Math.floor(Math.random() * answers.length);
        answerText.innerText = answers[randomIndex];

        eight.classList.add('hidden');
        triangle.classList.remove('hidden');
        
        downloadBtn.classList.remove('hidden');
    }, 600);
});

downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "DIVINING..."; 
    
    html2canvas(captureArea, {
        backgroundColor: "#09001d", 
        scale: 3, 
        useCORS: true, 
        logging: false,
        x: window.scrollX,
        y: window.scrollY,
        width: captureArea.offsetWidth,
        height: captureArea.offsetHeight
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'MagicBlock-Prophecy.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        downloadBtn.innerText = originalText;
    });
});
