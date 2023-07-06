let operand1,
	operand2,
	operator1,
	operator2,
	result = null;
let displayValue = "0";

const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const sign = document.querySelector(".sign");
const percent = document.querySelector(".percent");
const equals = document.querySelector(".equals");

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
clear.addEventListener("click", (e) => {
	operand1 = null;
	operand2 = null;
	operator1 = null;
	operator2 = null;
	result = null;
	displayValue = "0";
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
}

function operandClicked(operand) {
	console.log(operand);
	return;
}

function operatorClicked(operator) {
	console.log(operator);
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
