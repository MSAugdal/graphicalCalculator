let firstOperand,
	secondOperand,
	firstOperator,
	secondOperator,
	result = null;
let displayValue = "0";

const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");
const equals = document.querySelector(".equals");
const display = document.querySelector("#display");

operands.forEach((operand) => {
	operand.addEventListener("click", (e) => {
		operandClicked(e.target.value);
	});
});
operators.forEach((operator) => {
	operator.addEventListener("click", (e) => {
		operatorClicked(e.target.value);
	});
});
clear.addEventListener("click", () => {
	firstOperand = null;
	secondOperand = null;
	firstOperator = null;
	secondOperator = null;
	result = null;
	displayValue = "0";
	updateScreen(displayValue);
});
sign.addEventListener("click", () => {
	if (displayValue.includes("-")) {
		displayValue = displayValue.slice(1);
		updateScreen(displayValue);
	} else {
		displayValue = `-${displayValue}`;
		updateScreen(displayValue);
	}
});
percent.addEventListener("click", () => {
	displayValue = displayValue / 100;
	updateScreen(displayValue);
});
equals.addEventListener("click", () => {
	displayValue = operate(firstOperator, firstOperand, secondOperand);
	firstOperand = displayValue;
	// firstOperator = null;
	// secondOperand = null;
	updateScreen(displayValue);
	console.log(displayValue);
});

function operate(operator, num1, num2) {
	let operators = {
		"+": (x, y) => Number(x) + Number(y),
		"-": (x, y) => Number(x) - Number(y),
		"*": (x, y) => Number(x) * Number(y),
		"/": (x, y) => Number(x) / Number(y),
	};
	return operators[operator](num1, num2);
}

function updateScreen(value) {
	displayValue = value;
	display.innerHTML = displayValue;
}

function operandClicked(operand) {
	if (!firstOperand) {
		updateScreen(operand);
		firstOperand = displayValue;
	} else if (firstOperand && firstOperator && !secondOperand) {
		updateScreen(operand);
		secondOperand = displayValue;
	} else if (firstOperand && firstOperator && secondOperator) {
		updateScreen(operand);
		firstOperand = displayValue;
		firstOperator = secondOperator;
		secondOperator = null;
	} else {
		displayValue += operand;
		updateScreen(displayValue);
	}
	console.log(`
    firstOperand: ${firstOperand}
    firstOperator: ${firstOperator}
    secondOperand: ${secondOperand}
    secondOperator: ${secondOperator}`);
	return;
}

function operatorClicked(operator) {
	if (firstOperand && !firstOperator) {
		firstOperator = operator;
	} else if (firstOperand && firstOperator) {
		if (secondOperand) {
			equals.click();
		}
		if (firstOperator !== operator) {
			secondOperator = operator;
		}
	}
	console.log(`
    firstOperand: ${firstOperand}
    firstOperator: ${firstOperator}
    secondOperand: ${secondOperand}
    secondOperator: ${secondOperator}`);
	return;
}

// store all values (operand1-2, operator, displayValue)
// event handler to get operand1-2 and operator1.

// operand clicked (operand):
//      if operand1 === null
//          displayValue = operand
//
//      else operand1 !== null && operator1 !== null:
//
//
// operator clicked (operator):
//      if operator1 === null and operator2 === null:
//          operator1 = operator
//          operand1 = displayValue
//
//
//      if operator2 === operator1 and operands are populated, calculate again
//      if operator 2 !== operator 1,
// if new operator clicked is same as last, calculate again
// function to get keystrokes and click buttons accordingly
// handle when displayValue is longer than display can show?
//
// function to calculate and return result
// update display with reuslt
