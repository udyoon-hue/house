
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const bonusCheckbox = document.getElementById('bonus-checkbox');
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', next);
    });

    // Function to generate unique random numbers in a given range
    function generateUniqueNumbers(count, min, max) {
        const numbers = new Set();
        while (numbers.size < count) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    // Function to generate and display lotto numbers
    function generateAndDisplayLottoSets() {
        lottoNumbersContainer.innerHTML = '';
        const includeBonus = bonusCheckbox.checked;

        for (let i = 0; i < 5; i++) {
            const lottoSetDiv = document.createElement('div');
            lottoSetDiv.className = 'lotto-set';

            const mainNumbers = generateUniqueNumbers(6, 1, 45);

            mainNumbers.forEach(num => {
                const numberDiv = document.createElement('div');
                numberDiv.className = 'lotto-number';
                numberDiv.textContent = num;
                lottoSetDiv.appendChild(numberDiv);
            });

            if (includeBonus) {
                let bonusNumber;
                do {
                    bonusNumber = Math.floor(Math.random() * 45) + 1;
                } while (mainNumbers.includes(bonusNumber));

                const bonusDiv = document.createElement('div');
                bonusDiv.className = 'lotto-number bonus';
                bonusDiv.textContent = bonusNumber;
                lottoSetDiv.appendChild(bonusDiv);
            }

            lottoNumbersContainer.appendChild(lottoSetDiv);
        }
    }

    generateBtn.addEventListener('click', generateAndDisplayLottoSets);
});
