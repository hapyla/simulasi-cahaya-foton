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

    // Ubah warna preview berdasarkan panjang gelombang
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
