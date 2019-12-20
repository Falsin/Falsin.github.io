let body = document.querySelector('body');
let child = body.children;
let area = body.querySelectorAll('.avatar');
let shadow = body.querySelectorAll(".shadow");


let button = body.querySelectorAll('.button');
let submit = body.querySelectorAll('.submit');
let link = body.querySelectorAll("a");
let array = [button, submit, link];

let section = body.querySelector('section');
let cancel = section.querySelector(".cancel");


function enumeration(value) { 
	value.forEach(item => {
		item.forEach(item => {
			item.addEventListener("click", function(evt) {
				evt.preventDefault();
				section.classList.add("active");
				//child.results.forEach(item => item.classList.add("blur")); doesn't work
				for (let m = 0; m < child.length && child[m] != section; m++) {
					child[m].classList.add("blur");
				}		
			})
		})
	})
} 

cancel.addEventListener("click", function(evt) {
	section.classList.remove("active");
	//child.forEach(item => item.classList.remove("blur"))
	for (let m = 0; m < child.length && child[m] != section; m++) {
		child[m].classList.remove("blur");
	}	
	for (let j = 0; j < area.length; j++) {
		shadow[j].classList.remove("avatarActive");
	}			
})


for (let i = 0; i < area.length; i++) {
	area[i].addEventListener("click", function(evt) {
		for (let j = 0; j < area.length; j++) {
			shadow[j].classList.remove("avatarActive");
		}
		shadow[i].classList.add("avatarActive");
	})
}


enumeration(array);
