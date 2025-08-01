let input = '';

function handleButtonClick(value) {
    if (value === 'C') {
        input = '';
        updateDisplay();
    } else if (value === '=') {
        try {
            input = eval(input).toString();
        } catch {
            input = 'Error';
        }
        updateDisplay();
    } else {
        if (input.length < 10) {
            input += value;
            updateDisplay();
        }
    }
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.value = input || '0';
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});