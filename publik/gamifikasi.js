const questions = [
    { color: 'Merah', range: [620, 750] },
    { color: 'Hijau', range: [495, 570] },
    { color: 'Biru', range: [450, 495] },
    { color: 'Kuning', range: [570, 590] },
    { color: 'Oranye', range: [590, 620] },
    { color: 'Ungu', range: [380, 450] },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Panjang gelombang warna ${currentQuestion.color}?`;
    answerInput.value = '';
    feedbackElement.textContent = '';
}

submitButton.addEventListener('click', () => {
    const answer = parseInt(answerInput.value);
    const { range } = questions[currentQuestionIndex];

    if (answer >= range[0] && answer <= range[1]) {
        score += 10;
        feedbackElement.textContent = 'Benar! 🎉';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = `Salah! Panjang gelombang yang benar adalah ${range[0]}-${range[1]} nm.`;
        feedbackElement.style.color = 'red';
    }

    scoreElement.textContent = score;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 2000);
    } else {
        setTimeout(() => {
            feedbackElement.textContent = `Permainan selesai! Skor akhir kamu: ${score}.`;
            questionElement.textContent = 'Selesai!';
            submitButton.disabled = true;
            answerInput.disabled = true;
        }, 2000);
    }
});

loadQuestion();
