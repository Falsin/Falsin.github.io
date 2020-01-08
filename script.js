let numbers 	  = document.querySelectorAll('.number');
let mathSymbols   = document.querySelectorAll('.mathSymbol');
let delets 		  = document.querySelectorAll('.delet');
let dot 		  = document.querySelector('#dot');
let specialSymbol = document.querySelector('#specialSymbol');

let textarea 	  = document.querySelector("textarea");

let lastNumber 	  = "0";
let isNewNumber   = false;
let NewNumber     = "0";

let globalOperation;

for (let i of numbers) {
	i.addEventListener('click', function(e) {
		pressNumber(e.target.textContent);
	});
}

for (let i of mathSymbols) {
	i.addEventListener('click', pressMathSymbols);
}

for (let i of delets) {
	i.addEventListener('click', function(e) {
		pressDelets(e.target.textContent);
	});
}

dot.addEventListener('click', pressDot);

specialSymbol.addEventListener('click', pressSpecialSymbol);

function pressNumber(arg) {
	if (textarea.textContent == "0") {
		textarea.textContent = arg;
		if (isNewNumber) {
			NewNumber = textarea.textContent;
		} else {
			lastNumber = textarea.textContent;
		}
	} else {
		textarea.textContent += arg;
		if (isNewNumber) {
			NewNumber = textarea.textContent;
		} else {
			lastNumber = textarea.textContent;
		}		
	}
}

function pressMathSymbols(arg) {   
	textarea.textContent = "0";
	isNewNumber = true;
	if (arg.target.textContent == "÷") {
		globalOperation = "÷";
	} else if (arg.target.textContent == "x") {
		globalOperation = "x";
	} else if (arg.target.textContent == "+") {
		globalOperation = "+";
	} else if (arg.target.textContent == "-") {
		globalOperation = "-";
	} else if (arg.target.textContent == "%") {
		globalOperation = "%";
	} else if (arg.target.textContent == "=") {
		if (globalOperation == "÷") {
			textarea.textContent = lastNumber / NewNumber;
			changeNumbers()
		} else if (globalOperation == "x") {
			textarea.textContent = lastNumber * NewNumber;
			changeNumbers()
		} else if (globalOperation == "+") {
			textarea.textContent = +lastNumber + +NewNumber;
			changeNumbers()
		} else if (globalOperation == "-") {
			textarea.textContent = lastNumber - NewNumber;
			changeNumbers()
		} else if (globalOperation == "%") {
			textarea.textContent = lastNumber * NewNumber / 100;
			changeNumbers()
		}	 	
	}
}

function pressDelets(arg) {
	if (arg == "C") {
		textarea.textContent = "0";
		lastNumber = "0";
		NewNumber = "0";
		isNewNumber = false;
	} else {
		let answer = textarea.textContent.split("");
		textarea.textContent = answer.slice(0, answer.length - 1).join("");		
	}
}

function pressDot() {
	if (!textarea.textContent.includes(".")) {
		textarea.textContent += ".";
	}
}

function pressSpecialSymbol() {
	textarea.textContent *= (-1);
	if (isNewNumber) {
		NewNumber = textarea.textContent;
	} else {
		lastNumber = textarea.textContent;
	}		
}

function changeNumbers() {
	lastNumber = textarea.textContent;
	NewNumber = "0";
};
