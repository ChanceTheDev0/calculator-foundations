let operatorCalled = false;
let midEquation = false;
let a, b, currentOperator, baseLength, isExponent;
const maxDigits = 7;
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error";
    } else {
        return a / b;
    }
}

function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':    
            return a * b;    
        case '/':
            return a / b;
    }
}

let currentExpression = "";
let currentNumber = "";
let result = 0;

function updateDisplay(btn) {
    if (btn.classList.contains("number")) {
        if (currentNumber.length < maxDigits) { 
            currentNumber += btn.innerHTML;
            currentExpression += btn.innerHTML;
            display.innerHTML = currentExpression;
        }
    } else if (btn.classList.contains("operator")) {
        currentExpression += btn.innerHTML;
        let num = parseFloat(currentNumber);
        currentNumber = "";
        if (result === 0) {
            result = num;
        } else {
            result = operate(result, currentOperator, num);
        }
        currentOperator = btn.innerHTML;
        display.innerHTML = currentExpression;
    } else if (btn.classList.contains("equals")) {
        let num = parseFloat(currentNumber);
        result = operate(result, currentOperator, num);
        currentExpression = result;
        currentNumber = "";
        currentOperator = "+";
        display.innerHTML = result;
    } else if (btn.classList.contains("clear")) {
        currentExpression = "";
        currentNumber = "";
        result = 0;
        currentOperator = "+";
        display.innerHTML = "0";
    }
}

buttons.forEach(btn => btn.addEventListener('click', e => updateDisplay(e.target)));

window.addEventListener('keydown', e => {
    let btn = document.getElementById(e.key); 
    if (btn) updateDisplay(btn); 
});

function handleDecimal() {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        currentExpression += '.';
        display.innerHTML = currentExpression;
    }
}

document.querySelector('.decimal').addEventListener('click', handleDecimal);

window.addEventListener('keydown', e => {
    if (e.key === '.') handleDecimal();
});