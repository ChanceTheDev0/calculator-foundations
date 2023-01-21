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
        default:
            throw new Error(`Invalid operator: ${operator}`);  
    }
}

let displayValue = "";

function updateDisplay(btn) {
    if (btn.classList.contains("number")) {
        if (displayValue.length < maxDigits) {
            if (displayValue === "0" && btn.innerHTML !== ".") {
                displayValue = btn.innerHTML;
            } else {
                displayValue += btn.innerHTML;
            }
        }
    } else if (btn.classList.contains("operator")) {
        if (displayValue === "" && btn.innerHTML === "-") {
            displayValue = "-";
        } else if (displayValue !== "" && !currentOperator) {
            a = parseFloat(displayValue);
            currentOperator = btn.innerHTML;
            displayValue = "";
        }
    } else if (btn.classList.contains("decimal")) {
        if (displayValue.indexOf(".") === -1) {
            displayValue += ".";
        }
    } else if (btn.classList.contains("equals")) {
        if (currentOperator && displayValue) {
            b = parseFloat(displayValue);
            displayValue = operate(a, currentOperator, b);
            currentOperator = null;
            a = null;
            b = null;
        }
    } else if (btn.classList.contains("clear")) {
        displayValue = "";
        currentOperator = null;
        a = null;
        b = null;
    }

    display.innerHTML = displayValue;
}

buttons.forEach(btn => btn.addEventListener('click', e => updateDisplay(e.target)));

window.addEventListener('keydown', e => {
    let btn = document.getElementById(e.key); 
    if (btn) updateDisplay(btn); 
});