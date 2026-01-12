let firstNumber = "";
let secondNumber = "";
let operator = "";

function sum(a, b){
    console.log(`Sum: ${a} + ${b}`);
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

function operate(a, b, operator){
    switch(operator){
        case "+":
            return sum(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
        default:
            return "ERROR";
    }
}

let calculationDisplay = document.querySelector(".calculation-textfield");
let historyDisplay = document.querySelector("#history");
let buttons = document.querySelectorAll(".keypad-button");
let currentValue = "";
let result = 0;
buttons.forEach(button => {
button.addEventListener("click", (e) => {
    console.log(button.className);
    switch(button.className) {
        case "keypad-button operator equals-sign":
            result = operate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
            calculationDisplay.textContent = `${result}`;

            let historyRecord = document.createElement("div");
            historyRecord.classList.add("history-textfield");
            historyRecord.textContent = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
            historyDisplay.appendChild(historyRecord);
            firstNumber = result;
            secondNumber = "";
            currentValue = "";
            operator = "";
            break;
        case "keypad-button operator":
            if(!operator || (operator && !secondNumber)){
            operator = button.textContent;
            currentValue = "";
            calculationDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
            } else if(operator && secondNumber){
                result = operate(parseFloat(firstNumber), parseFloat(secondNumber), operator);
                let historyRecord = document.createElement("div");
                historyRecord.classList.add("history-textfield");
                historyRecord.textContent = `${firstNumber} ${operator} ${secondNumber} = ${result}`;
                historyDisplay.appendChild(historyRecord);
                firstNumber = result;
                operator = button.textContent;
                secondNumber = "";
                currentValue = "";
                calculationDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
            }
            break;
        case "keypad-button":
            currentValue = currentValue+button.textContent;
            if(!operator){
                firstNumber = currentValue;
            } else {
                secondNumber = currentValue;
            }
            calculationDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
            break;
    }
    console.log(`current: ${currentValue}\nfirstNumber: ${firstNumber}\noperator: ${operator}\nsecondNumber: ${secondNumber}\nresult: ${result}`);
    });
});