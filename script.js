let widthWindow = document.documentElement.clientWidth;
let heightWindow = document.documentElement.heightWindow;

let elements = document.querySelectorAll('.element');

if (widthWindow < heightWindow) {
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.width = widthWindow / 5 + 'px';
		elements[i].style.heigth = widthWindow / 5 + 'px';
	}
} else {
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.width = heightWindow / 6 + 'px';
		elements[i].style.heigth = widthWindow / 6 + 'px';
	}
}

/* let container		 = document.getElementById('container');
let navDiv 			 = document.querySelector('nav');
let nav  			 = document.querySelectorAll('.nav');
let calculator 		 = document.querySelectorAll('.calculator');
let bla				 = document.querySelectorAll('.bla');
let table			 = document.querySelectorAll('table');

let inputs 			 = document.querySelectorAll('input');
let numbers 		 = document.querySelectorAll('.number');
let mathOperator 	 = document.querySelectorAll('.mathOperator');
let equals 			 = document.querySelectorAll('.grid-equals');
let cancels 		 = document.querySelectorAll('.cancel');
let Deletes 		 = document.querySelectorAll('.Delete');
let dots 			 = document.querySelectorAll('.dot');
let percents 		 = document.querySelectorAll('.percent');
let additiveInverses = document.querySelectorAll('.additiveInverse');

let squared			 = document.querySelector('.squared');
let cubed 			 = document.querySelector('.cubed');
let power 			 = document.querySelector('.power');
let root			 = document.querySelector('.root');
let cubicRoot 		 = document.querySelector('.cubicRoot')
let natLog			 = document.querySelector('.natLog');
let decLog			 = document.querySelector('.decLog');
let factorial		 = document.querySelector('.factorial');
let sin			 	 = document.querySelector('.sin');
let cos				 = document.querySelector('.cos');
let tan				 = document.querySelector('.tan');
let e 				 = document.querySelector('.e');
let PI				 = document.querySelector('.PI');
let fraction		 = document.querySelector('.fraction');
let powerDec		 = document.querySelector('.powerDec');


let array 			 = [];
let number 			 = "";
let percentActive 	 = true;
let powerTrue		 = false;
let numberPow;  

if (document.documentElement.clientWidth < 500) {
	container.className = 'standartContainer';
}

for (let i of nav) {
	i.addEventListener("mousedown", () => pressNav(i));
}

for (const i of numbers) {
	i.addEventListener("mousedown", function (e) { 
		pressNumbers(e.target.textContent)
	});
}

for (const i of mathOperator) {
	i.addEventListener('mousedown', function(e) {
		pressOperations(e.target.textContent);
	});
}

for (const i of equals) {
	i.addEventListener('mousedown', pressEquals);
}

for (const i of cancels) {
	i.addEventListener('mousedown', pressCancel);
}

for (const i of Deletes) {
	i.addEventListener('mousedown', pressDeletes)
}

for (const i of dots) {
	i.addEventListener('mousedown', pressDots)
}

for (const i of percents) {
	i.addEventListener('mousedown', pressPercents);
}

for (const i of additiveInverses) {
	i.addEventListener('mousedown', pressAdditiveInverses);
}

let pw = pressPower();

cubicRoot.addEventListener('mousedown', () => knownPow(1/3));

cubed.addEventListener('mousedown', () => knownPow(3));

root.addEventListener('mousedown', () => knownPow(0.5))

squared.addEventListener('mousedown', () => knownPow(2));

power.addEventListener('mousedown', pw);

natLog.addEventListener('mousedown', pressNatLog);

decLog.addEventListener('mousedown', pressDecLog);

factorial.addEventListener('mousedown', () => pressFac(inputs[0].value)); 

sin.addEventListener('mousedown', () => pressSin(inputs[0].value));

cos.addEventListener('mousedown', () => pressCos(inputs[0].value));

tan.addEventListener('mousedown', () => pressTan(inputs[0].value));

e.addEventListener('mousedown', () => pressE(inputs[0].value));

PI.addEventListener('mousedown', pressPI);

fraction.addEventListener('mousedown', pressFraction);

powerDec.addEventListener('mousedown', () => pressPowerDec(inputs[0].value));

function pressNav(arg) {
	for (let i = 0; i < nav.length; i++) {
		nav[i].classList.remove('active');
		calculator[i].classList.remove('activeCalc');
	}

	let id = [...nav].indexOf(arg);
	calculator[id].classList.add('activeCalc');
	arg.classList.add('active');

	if (id == 1) {
		container.className = 'extendedContainer';
		navDiv.style.width = 24 + "vw";
	} else if (id == 0) {
		container.className = 'standartContainer';
		navDiv.style.width = 24 + "vw";
	}
}

function pressAdditiveInverses(arg) {
	number = -1 * number;
	Iterations(inputs, -1);
}

function pressNumbers(arg) {
	if (inputs[0].value == '0' || number == '') {
		Iterations(inputs, '', true);
	}

	if (inputs[0].value.length < 13) {
		Iterations(inputs, arg, false)
		number = inputs[0].value;
	}
}

function pressOperations(arg) {
	if (typeof array[array.length - 1] == "array") {

	}

	if (powerTrue) {
		powFunct();
	}

	if (!(number === "")) {
		array.push(number);
	}

	number = "";
	let result = array[array.length - 1];

	if (!isNaN(result)) {
		array.push(arg);
	} else {
		array[array.length - 1] = arg;
	}
	percentActive = true;
}

function pressPower () {
	let localNumber;
	return function () {
		if (powerTrue) {
			return localNumber;
		}
		localNumber = number;
		Iterations(inputs, '0', true);
		powerTrue = true;			
	}		
}

function powFunct() {
	n = inputs[0].value;

	if (numberPow === undefined) {
		number = pw() ** n;
		numberPow = number;
	} else {
		number = numberPow ** n;
	}
	let numberInput = number.toPrecision(8);
	
	(!array.length) ? array[0] = +numberInput : array[array.length-1] = +numberInput;
	number = '';
	powerTrue = false;
	return numberInput;
}

function pressEquals() {
	if ((array.length < 3 && number === "" || array.length < 2) && !powerTrue) {
		return;
	} 
	let count;
	if (powerTrue) {
		count = powFunct();
	}

	array.push(number);

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
	number = (+count).toPrecision(8);
	roundNumber();
	array = [];
}

function pressCancel() {
	array	= [];
	number 	= '';
	numberPow = undefined;
	Iterations(inputs, '0', true);
}

function pressDeletes() {
	Iterations(inputs, inputs[0].value.slice(0, -1), true);
	if (inputs[0].value.length < 1) {
		Iterations(inputs, '0', true);
	}
	number = inputs[0].value;
}

function pressDots() {
	let string = inputs[0].value;
	if (string.length < 13 && !string.includes('.')) {
		Iterations(inputs, ".", false);
	}
}

function pressPercents(arg) {
	if (percentActive) {
		let value = inputs[0].value / 100;
		if (array[array.length - 1] == "×") {
			number = value;
			Iterations(inputs, value, true);
		} else if (array[array.length - 1] == "÷") {
			number = value;
			Iterations(inputs, value, true);
		} else if (array[array.length - 1] == "+") {
			number = array[array.length - 2] * value;
			Iterations(inputs, number, true);
		} else {
			number = array[array.length - 2] * value;
			Iterations(inputs, number, true);		
		}
	}
	percentActive = false;
}

function knownPow(arg) {
	number = (number ** arg).toPrecision(8);
	roundNumber()
}

function pressPowerDec(arg) {
	number = (10 ** arg).toPrecision(8);
	roundNumber()
}

function pressNatLog() {
	number = (Math.log(inputs[0].value)).toPrecision(8);
	Iterations(inputs, number, true);
}

function pressDecLog() {
	number = (Math.log10(inputs[0].value)).toPrecision(8);
	Iterations(inputs, number, true);
}

let rec = arg => (arg == 1) ? 1 : arg * rec(arg - 1);

function pressFac(arg) {
	number = rec(arg).toPrecision(8);
	roundNumber()
}

function pressSin(arg) {
	number = Math.sin((arg * Math.PI/180)).toPrecision(8);
	roundNumber()
}

function pressCos(arg) {
	number = Math.cos((arg * Math.PI/180)).toPrecision(8);
	roundNumber()
}

function pressTan(arg) {
	number = Math.tan((arg * Math.PI/180)).toPrecision(8);
	roundNumber()	
}

function pressE() {
	number = (Math.E).toPrecision(8);
	roundNumber();
}

function pressPI() {
	number = (Math.PI).toPrecision(8);
	roundNumber();	
}

function roundNumber() {
	if (number.length < 12) number = parseFloat(number);
	Iterations(inputs, number, true);	
}

function pressFraction() {
	number = (1/inputs[0].value).toPrecision(8);
	roundNumber();	
}

function Iterations(array, arg, assign) {
	for (let i of array) {
		if (arg == -1) {
			i.value = number;
		} else {
			(assign) ? i.value = arg : i.value += arg;
		}
	}
}

if (document.documentElement.clientWidth < 800) {
	let timerId = setTimeout(function stick() {
		//console.log(document.documentElement.clientHeight);
		container.style.height = document.documentElement.clientHeight;
		timerId = setTimeout(stick, 1000);
	}, 1000)
}

window.addEventListener('orientationchange', function () {
	if (window.orientation > 0 || window.orientation < 0) {
		navDiv.style.display = 'none';
		calculator[1].style.margin = '0';
		container.style.width = '100%';
		//container.style.height = '100vh';
		calculator[1].style.height = '100%';
		calculator[1].style.width = '100%';
		let height = bla[0].clientHeight / 1.6;
		for (let i = 0; i < calculator.length; i++) {
			calculator[i].classList.remove('activeCalc');
		}
		calculator[1].classList.add('activeCalc');		
		for (let i = 20; i < bla.length; i++) {
			bla[i].style.height = height + 'px';
			bla[i].style.paddingTop = '0';
			bla[i].style.paddingBottom = '0';
		}
		let lmmomo = table[20].clientHeight;
		for (let i = 20; i < table.length; i++) {
			console.log(table[i].clientWidth);
			table[i].style.width = lmmomo;
		}
	} else {
		calculator[1].classList.remove('activeCalc');
		calculator[0].classList.add('activeCalc');	
	}
}) */
