
let displayValue = '';
let firstNumber = null;
let operator = null;

function handleButtonClick(value) {
    if (value === 'C') {
        displayValue = '';
        firstNumber = null;
        operator = null;
        newNumberStarted = false;
    }
    else if (!isNaN(value)) {
        if (displayValue.length < 10) {
            displayValue += value;
            if (operator === null) {
                firstNumber = parseFloat(displayValue);
            }
        }
    }
    else if (['+', '-', '*', '/'].includes(value)) {
        displayValue += value;
        operator = value;
    }
    else if (value === '=') {
        try {
            let result = eval(displayValue);
            displayValue = result.toString().slice(0, 10);
            firstNumber = parseFloat(result);
            operator = null;
        } catch {
            displayValue = 'Error';
        }
    }
    updateDisplay();
}

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? 'Error' : a / b;
        default: return 'Error';
    }
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.value = displayValue || '0';
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});