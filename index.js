const btns = document.querySelectorAll("button");
const inputField = document.querySelector("h1");

let firstNumber = "";
let operatorValue = "";
let awaitingNextValue = false;

const displayNumbers = (value) => {
	if (awaitingNextValue) {
		inputField.textContent = value;
		awaitingNextValue = false;
	} else {
		// First, Getting the Number in the display
		const displayValue = inputField.textContent;

		// Evaluating it
		inputField.textContent =
			displayValue === "0" ? value : displayValue + value;
	}
};

const calculation = {
	"+": (a, b) => a + b,
	"-": (a, b) => a - b,
	"*": (a, b) => a * b,
	"/": (a, b) => a / b,
	"=": (a, b) => b,
};

const useOperator = (value) => {
	const currNumber = inputField.textContent;

	if (operatorValue && awaitingNextValue) {
		operatorValue = value;
		return;
	}

	if (!firstNumber) {
		firstNumber = currNumber;
	} else {
		let result = calculation[value](Number(firstNumber), Number(currNumber));
		inputField.textContent = result;

		firstNumber = result;
	}

	awaitingNextValue = true;
	operatorValue = value;

	console.log("First Number : ", firstNumber);
};

const clrNumberField = () => {
	inputField.textContent = "";
	firstNumber = "";
	secondNumber = "";
	operatorValue = "";
};

btns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if (btn.classList.contains("number")) {
			displayNumbers(e.target.value);
		} else if (btn.classList.contains("operator")) {
			useOperator(e.target.value);
		} else if (btn.classList.contains("decimal")) {
			console.log("Decimal : ", e.target.value);
		} else {
			clrNumberField();
		}
	});
});
