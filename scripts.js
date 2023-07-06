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
const dot = document.querySelector(".dot");

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
	if (!secondOperator) {
		displayValue = operate(firstOperator, firstOperand, secondOperand);
		updateScreen(displayValue);
		firstOperand = displayValue;
		secondOperand = null;
		firstOperator = null;
		return;
	}
	displayValue = operate(firstOperator, firstOperand, secondOperand);
	updateScreen(displayValue);
	firstOperand = displayValue;
	firstOperator = null;
	secondOperand = null;
});
dot.addEventListener("click", () => {
	if (!displayValue.includes(".")) {
		displayValue += ".";
		updateScreen(displayValue);
	}
});

function operate(operator, num1, num2) {
	let operators = {
		"+": (x, y) => Number(x) + Number(y),
		"-": (x, y) => Number(x) - Number(y),
		"*": (x, y) => Number(x) * Number(y),
		"/": (x, y) => {
			if (y === "0") {
				return "😾😾😾";
			}
			return Number(x) / Number(y);
		},
	};
	return operators[operator](num1, num2);
}

function updateScreen(value) {
	if (value.length > 9) {
		value = roundValue(value);
	}
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
	return;
}

function operatorClicked(operator) {
	if (!firstOperator) {
		firstOperator = operator;
		secondOperator = null;
		return;
	}
	equals.click();
	firstOperator = operator;
	return;
}

function roundValue(value) {
	return Number.parseFloat(value).toExponential(2).toString();
}
