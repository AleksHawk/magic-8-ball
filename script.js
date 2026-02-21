// Твої магічні відповіді
const answers = [
    "Безсумнівно", "Зірки кажуть так", "Усе вказує на це", "Так!",
    "Майбутнє туманне", "Спитай пізніше", "Сконцентруйся...",
    "Моя відповідь ні", "Зірки не радять", "Шанси малі", "Ні."
];

const ball = document.getElementById('magic-ball');
const eight = document.getElementById('eight');
const triangle = document.getElementById('triangle');
const answerText = document.getElementById('answer');
const downloadBtn = document.getElementById('download-btn');
const captureArea = document.getElementById('capture-area');

ball.addEventListener('click', () => {
    // 1. Ховаємо минулу відповідь і кнопку
    triangle.classList.add('hidden');
    eight.classList.remove('hidden');
    downloadBtn.classList.add('hidden');

    // 2. Запускаємо анімацію трясіння
    ball.classList.add('shake');

    // 3. Чекаємо завершення анімації (500 мілісекунд)
    setTimeout(() => {
        ball.classList.remove('shake');
        
        // Вибираємо випадкову відповідь з масиву
        const randomIndex = Math.floor(Math.random() * answers.length);
        answerText.innerText = answers[randomIndex];

        // Показуємо відповідь
        eight.classList.add('hidden');
        triangle.classList.remove('hidden');
        
        // Показуємо кнопку збереження
        downloadBtn.classList.remove('hidden');
    }, 500);
});

// Функція збереження скріншоту
downloadBtn.addEventListener('click', () => {
    // Змінюємо текст кнопки, щоб користувач розумів, що йде завантаження
    const originalText = downloadBtn.innerText;
    downloadBtn.innerText = "Магія працює...";
    
    html2canvas(captureArea, {
        backgroundColor: "#050011", // Зберігаємо темний фон для картинки
        scale: 2, // Подвійна якість для красивого PNG
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'MagicBlock-Prediction.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Повертаємо текст кнопці
        downloadBtn.innerText = originalText;
    });
});

// Створення магічного сліду (Sparkle Trail)
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.4) return; // Контролюємо густоту зірочок
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 800);
});
