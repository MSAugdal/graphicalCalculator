let firstOperand,
	secondOperand,
	firstOperator,
	secondOperator = null;
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
	if (!firstOperand) return;
	if (!firstOperator) return;
	if (!secondOperand) {
		displayValue = operate(firstOperator, firstOperand, firstOperand);
		updateScreen(displayValue);
		firstOperand = displayValue;
		return;
	}

	displayValue = operate(firstOperator, firstOperand, secondOperand);
	updateScreen(displayValue);
	firstOperand = displayValue;
	secondOperand = null;

	console.log(`
    firstOperand: ${firstOperand}
    firstOperator: ${firstOperator}
    secondOperand: ${secondOperand}
    secondOperator: ${secondOperator}`);
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
		displayValue = operand;
		updateScreen(displayValue);
		firstOperand = displayValue;
		return;
	}
	if (!firstOperator) {
		displayValue += operand;
		updateScreen(displayValue);
		firstOperand = displayValue;
		return;
	}
	if (!secondOperand) {
		displayValue = operand;
		updateScreen(displayValue);
		secondOperand = displayValue;
		return;
	}
	displayValue += operand;
	updateScreen(displayValue);
	secondOperand = displayValue;

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
		if (!secondOperand) {
			secondOperand = displayValue;
		} else {
			// displayValue = operate(operator, firstOperand, secondOperand);
			// updateScreen(displayValue);
			// firstOperand = displayValue;
			// secondOperator = operator;
			equals.click();
		}
		// if (firstOperator !== operator) {
		// 	secondOperator = operator;
		// }
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
