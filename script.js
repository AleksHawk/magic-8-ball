const answers = [
    "it is certain", "without a doubt", "stars say yes", "you may rely on it", "as i see it, yes",
    "reply hazy, try again", "ask again later", "cannot predict now", "concentrate and ask again",
    "don't count on it", "my reply is no", "my sources say no", "outlook not so good", "chances are slim"
];

const ball = document.getElementById('magic-ball');
const ballOuter = document.getElementById('magic-ball-outer');
const eightLogo = document.getElementById('eight');
const triangle = document.getElementById('triangle');
const answerText = document.getElementById('answer');
const downloadBtn = document.getElementById('download-btn');
const instructionsBox = document.getElementById('instructions-box');
const screenshotExport = document.getElementById('screenshot-export');
const bigAnswerText = document.getElementById('screenshot-big-answer');
const smallAnswerText = document.getElementById('screenshot-small-answer');
const fog = document.getElementById('fog');

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
    
    fog.classList.remove('hidden');
    setTimeout(() => fog.classList.add('active'), 10);

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
        
        fog.classList.remove('active');
        setTimeout(() => fog.classList.add('hidden'), 400);
        
        downloadBtn.classList.remove('hidden');
    }, 1200);
});

ballOuter.addEventListener('mousemove', (e) => {
    const rect = ballOuter.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    ballOuter.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

ballOuter.addEventListener('mouseleave', () => {
    ballOuter.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    ballOuter.style.transition = 'transform 0.5s ease';
});

ballOuter.addEventListener('mouseenter', () => {
    ballOuter.style.transition = 'transform 0.1s ease-out';
});

downloadBtn.addEventListener('click', () => {
    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "divining..."; 
    
    html2canvas(screenshotExport, {
        backgroundColor: "#050011", 
        scale: 2, 
        useCORS: true, 
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'magicblock-oracle.png';
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
