// Navigation: Highlight Active Page
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar nav ul li a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

// Input Foto (input-foto.html)
if (window.location.pathname.includes('input-foto.html')) {
    const uploadForm = document.getElementById('uploadForm');

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(uploadForm);
        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                window.location.href = 'hasil-analisis.html';
            } else {
                alert('Gagal mengunggah file. Coba lagi.');
            }
        } catch (err) {
            console.error(err);
        }
    });
}

// Hasil Analisis (hasil-analisis.html)
if (window.location.pathname.includes('hasil-analisis.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const resultDiv = document.getElementById('result');

        // Simulasi data hasil analisis
        const simulatedData = {
            filename: 'contoh.jpg',
            wavelength: '550 nm',
            detectedColor: 'Hijau',
        };

        resultDiv.innerHTML = `
            <h2>Hasil Analisis</h2>
            <p><strong>File:</strong> ${simulatedData.filename}</p>
            <p><strong>Panjang Gelombang:</strong> ${simulatedData.wavelength}</p>
            <p><strong>Warna Terdeteksi:</strong> ${simulatedData.detectedColor}</p>
        `;
    });
}

// Database LED (database.html)
if (window.location.pathname.includes('database.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const tableBody = document.querySelector('tbody');
        const ledData = [
            { color: 'Merah', wavelength: '620–750 nm', energy: '1.65–2.00 eV' },
            { color: 'Hijau', wavelength: '495–570 nm', energy: '2.17–2.50 eV' },
            { color: 'Biru', wavelength: '450–495 nm', energy: '2.50–2.75 eV' },
            { color: 'Kuning', wavelength: '570–590 nm', energy: '2.10–2.17 eV' },
            { color: 'Oranye', wavelength: '590–620 nm', energy: '2.00–2.10 eV' },
        ];

        ledData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.color}</td>
                <td>${row.wavelength}</td>
                <td>${row.energy}</td>
            `;
            tableBody.appendChild(tr);
        });
    });
}

// Gamifikasi (gamifikasi.html)
if (window.location.pathname.includes('gamifikasi.html')) {
    const questions = [
        { color: 'Merah', range: [620, 750] },
        { color: 'Hijau', range: [495, 570] },
        { color: 'Biru', range: [450, 495] },
        { color: 'Kuning', range: [570, 590] },
        { color: 'Oranye', range: [590, 620] },
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
            feedbackElement.textContent = `Salah! Panjang gelombang yang benar adalah ${range[0]}–${range[1]} nm.`;
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
}

// Pendidikan (pendidikan.html)
if (window.location.pathname.includes('pendidikan.html')) {
    const wavelengthSlider = document.getElementById('wavelengthSlider');
    const wavelengthValue = document.getElementById('wavelengthValue');
    const photonEnergy = document.getElementById('photonEnergy');
    const colorPreview = document.getElementById('colorPreview');

    wavelengthSlider.addEventListener('input', () => {
        const wavelength = wavelengthSlider.value;
        wavelengthValue.textContent = wavelength;

        const h = 4.1357e-15; // Konstanta Planck dalam eV.s
        const c = 3e8; // Kecepatan cahaya dalam m/s
        const energy = (h * c) / (wavelength * 1e-9); // Energi dalam eV
        photonEnergy.textContent = energy.toFixed(2);

        colorPreview.style.backgroundColor = getColorFromWavelength(wavelength);
    });

    function getColorFromWavelength(wavelength) {
        if (wavelength >= 380 && wavelength < 450) return 'purple';
        if (wavelength >= 450 && wavelength < 495) return 'blue';
        if (wavelength >= 495 && wavelength < 570) return 'green';
        if (wavelength >= 570 && wavelength < 590) return 'yellow';
        if (wavelength >= 590 && wavelength < 620) return 'orange';
        if (wavelength >= 620 && wavelength <= 750) return 'red';
        return 'black'; // Di luar spektrum cahaya tampak
    }
}
