let input 			= document.querySelector('input'); 
let numbers 		= document.querySelectorAll('.number');
let mathOperator 	= document.querySelectorAll('.mathOperator');
let equals 			= document.querySelector('.grid-equals');
let cancel 			= document.querySelector('.cancel');
let Delete 			= document.querySelector('.Delete');
let dot 			= document.querySelector('.dot');
let percent 		= document.querySelector('.percent');
let additiveInverse = document.querySelector('.additiveInverse');

let array 	= [];
let number 	= "";
let percentActive = true;


for (let i of numbers) {
	i.addEventListener("mousedown", function (e) { 
		// данный код начинает выполняться после того как произошло событие
		pressNumbers(e.target.textContent)
	});
}

for (let i of mathOperator) {
	i.addEventListener('mousedown', function(e) {
		pressOperations(e.target.textContent);
	});
}

equals.addEventListener('mousedown', pressEquals);

cancel.addEventListener('mousedown', pressCancel);

Delete.addEventListener('mousedown', pressDelete);

dot.addEventListener('mousedown', pressDot);

percent.addEventListener('mousedown', pressPercent);

additiveInverse.addEventListener('mousedown', pressAdditiveInverse);

function pressNumbers(arg) {
	if (input.value == "0" || number == "") {
		input.value = "";
	} 	
	if (input.value.length < 13) {
		input.value += arg;
		number = input.value;
	}	
}

function pressOperations(arg) {
	if (!(number == "")) {
		array.push(number);
	}
	number = "";
	let result = array[array.length - 1];
	if (!isNaN(result)) {
		array.push(arg);
	}
	percentActive = true;
}

function pressEquals() {
	array.push(number);
	let count;
	for (let i = 0; i < array.length - 1;) {
		if (array[i + 1] == "×") {
			count = array[i] * array[i + 2];
			array.splice(i, 3, count);
		} else if (array[i + 1] == "÷") {
			count = array[i] / array[i + 2];
			array.splice(i, 3, count);
		} else {
			i+=2;
		}
	}
	for (let j = 0; j < array.length - 1;) {
		if (array[j + 1] == "+") {
			count = +array[j] + +array[j + 2];
			array.splice(j, 3, count);
		} else if (array[j + 1] == "−") {
			count = array[j] - array[j + 2];
			array.splice(j, 3, count);			
		}
		else {
			j+=2;
		}
	}
	input.value = array[0];
	number = input.value;
	array = [];
}

function pressCancel() {
	return input.value = "0";
}

function pressDelete() {
	input.value = input.value.slice(0, -1);
	if (input.value.length < 1) {
		input.value = "0";
	}
}

function pressDot() {
	let string = input.value;
	if (string.length < 13 && !string.includes('.')) {
		input.value += ".";
	}
}

function pressPercent(arg) {
	if (percentActive) {
		let value = input.value / 100;
		if (array[array.length - 1] == "×") {
			number = value;
			input.value = value;
		} else if (array[array.length - 1] == "÷") {
			number = value;
			input.value = value;
		} else if (array[array.length - 1] == "+") {
			number = array[array.length - 2] * value;
			input.value = number;
		} else {
			number = array[array.length - 2] * value;
			input.value = number;			
		}
	}
	percentActive = false;
}
