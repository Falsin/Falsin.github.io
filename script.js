let numbers 	  = document.querySelectorAll('.number');
let mathSymbols   = document.querySelectorAll('.mathSymbol');
let equal         = document.querySelector('.equal');
let delets 		  = document.querySelectorAll('.delet');
let dot 		  = document.querySelector('#dot');
let specialSymbol = document.querySelector('#specialSymbol');

let textarea 	  = document.querySelector("textarea");


let nav 		  = document.querySelectorAll('.nav');

let arrOfNumbers  = [];

for (let i of numbers) {
	i.addEventListener('click', function(e) {
		pressNumber(e.target.textContent);
	});
}

for (let i of mathSymbols) {
	i.addEventListener('click', function(e) {
		pressMathSymbols(e.target.textContent);
	});
}

for (let i of delets) {
	i.addEventListener('click', function(e) {
		pressDelets(e.target.textContent);
	});
}

dot.addEventListener('click', pressDot);

specialSymbol.addEventListener('click', pressSpecialSymbol);

equal.addEventListener('click', pressEqual);

for (let i of nav) {
	i.addEventListener('click', function(e) {
		pressNav(e.srcElement);
	});
}

function pressNav(arg) {
	for (let i of nav) {
		i.classList.remove('active');
	}
	arg.classList.add('active');
}

function pressNumber(arg) {
	if (textarea.textContent == "0") {
		textarea.textContent = arg;
	} else {
		textarea.textContent += arg;
	}
}

function pressMathSymbols(arg) {
	arrOfNumbers.push(parseFloat(textarea.textContent));
	arrOfNumbers.push(arg); 
	textarea.textContent = "0";
}

function pressEqual() {
	arrOfNumbers.push(parseFloat(textarea.textContent));
	for (let i = 0; i < arrOfNumbers.length; i++) {
		if (arrOfNumbers[i + 1] == "x") {
			let times = arrOfNumbers[i] * arrOfNumbers[i + 2];
			arrOfNumbers.splice(i, 3, times);
		} else if (arrOfNumbers[i + 1] == "÷") {
			let times = arrOfNumbers[i] / arrOfNumbers[i + 2];
			arrOfNumbers.splice(i, 3, times);
		}
	}
	for (let i = 0; i < arrOfNumbers.length; i++) {
		if (arrOfNumbers[i + 1] == "+") {
			let times = arrOfNumbers[i] + arrOfNumbers[i + 2];
			arrOfNumbers.splice(i, 3, times);
		} else if (arrOfNumbers[i + 1] == "-") {
			let times = arrOfNumbers[i] - arrOfNumbers[i + 2];
			arrOfNumbers.splice(i, 3, times);			
		}
 	}
 	textarea.textContent = arrOfNumbers[0];
 	arrOfNumbers = [];
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
