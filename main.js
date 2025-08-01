let displayValue = '';
let expression = [];

function handleButtonClick(value) {
    if (value === 'C') {
        displayValue = '';
        expression = [];
    }

    else if (!isNaN(value) || value === '.') {
        displayValue += value;
    }

    else if (['+', '-', '*', '/'].includes(value)) {
        if (displayValue !== '' && !isOperatorLast()) {
            expression.push(displayValue);
            expression.push(value);
            displayValue += value;
        }
    }

    else if (value === '=') {
        if (displayValue !== '' && !isOperatorLast()) {
            expression.push(getLastNumber());
            const result = evaluateExpression(expression);
            displayValue = result.toString().slice(0, 10);
            expression = [];
        }
    }

    updateDisplay();
}

function isOperatorLast() {
    const lastChar = displayValue[displayValue.length - 1];
    return ['+', '-', '*', '/'].includes(lastChar);
}

function getLastNumber() {
    const parts = displayValue.split(/[\+\-\*\/]/);
    return parts[parts.length - 1];
}

function evaluateExpression(tokens) {
    let temp = [...tokens];

    // 1. İşlem önceliği: * ve /
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] === '*' || temp[i] === '/') {
            const a = parseFloat(temp[i - 1]);
            const b = parseFloat(temp[i + 1]);
            const result = temp[i] === '*' ? a * b : b === 0 ? 'Error' : a / b;

            temp.splice(i - 1, 3, result);
            i--; // işlenen yeri tekrar kontrol et
        }
    }

    // 2. Sonra + ve -
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] === '+' || temp[i] === '-') {
            const a = parseFloat(temp[i - 1]);
            const b = parseFloat(temp[i + 1]);
            const result = temp[i] === '+' ? a + b : a - b;

            temp.splice(i - 1, 3, result);
            i--;
        }
    }

    return temp[0];
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.value = displayValue || '0';
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
});

