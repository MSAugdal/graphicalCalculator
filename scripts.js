let num1 = "";
let num2 = "";
let operator = "";
let showDummy = true;
let clickedOperator = false;
let hasCalculated = false;

let operators = {
	"+": (x, y) => Number(x) + Number(y),
	"-": (x, y) => Number(x) - Number(y),
	"*": (x, y) => Number(x) * Number(y),
	"/": (x, y) => Number(x) / Number(y),
};

function operate(operator, x, y) {
	hasCalculated = true;
	returnValue = operators[operator](x, y);
	// num1 = "";
	num2 = "";
	operator = "";
	clickedOperator = false;
	return returnValue;
}

const display = document.getElementById("display-content");

function updateScreen(value) {
	display.innerText += value;
}

const buttons = document.querySelectorAll(".num");
buttons.forEach((button) => {
	button.addEventListener("click", (e) => {
		if (showDummy === true) {
			showDummy = false;
			display.innerText = "";
		}
		if (hasCalculated && e.target.id !== "=") {
			hasCalculated = false;
			// display.innerText = "";
		}
	});
});

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
	num1 = "";
	num2 = "";
	operator = "";
	clickedOperator = false;
	hasCalculated = false;
	display.innerText = "";
	console.log(num1, num2, operator);
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		if (e.target.id !== "=" && num1 !== "")
			if (clickedOperator === false) {
				clickedOperator = true;
				operator = button.id;
				updateScreen(operator);
			}
		if (clickedOperator === true && num2 !== "" && e.target.id == "=") {
			display.innerText = operate(operator, num1, num2);
			num1 = display.innerText;
		}
		console.log(num1, num2, operator);
	});
});

const nums_container = document.querySelector(".nums");
const nums = nums_container.querySelectorAll(".num");
nums.forEach((num) => {
	num.addEventListener("click", (e) => {
		if (clickedOperator === false) {
			num1 += e.target.id;
			updateScreen(e.target.id);
			return;
		}
		num2 += e.target.id;
		updateScreen(e.target.id);
		console.log(num1, num2, operator);
	});
});
