/*********************************CALCULATE AGE*********************/
function calcAge() {
	let userDateinput = document.querySelector('#data').value;
	let birthDate = new Date(userDateinput);
	var difference = Date.now() - birthDate.getTime();
	var age = new Date(difference);
	var calculatedAge = Math.abs(age.getUTCFullYear() - 1970);
	document.getElementById('eta').setAttribute('value', calculatedAge);
}
/************************VALIDATION*********************************/
const submit = document.querySelector(".send");
let esiste = false;
let utenti = [];
submit.addEventListener("click", valida);
function valida(e) {
	e.preventDefault();
	let req = document.querySelectorAll('._req')
	let errore = document.querySelector('.errore');
	let mail = document.querySelector('._email')
	var email_valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
	var code_valid = /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/;
	let code = document.querySelector('._code');
	/*********************************CHECK if codice fiscale already exists in localStore**********/
	form.codice.addEventListener('change', function (e) {
		let personaCodice = JSON.parse(localStorage.getItem('persone'));
		for (let index = 0; index < personaCodice.length; index++) {
			let persona = personaCodice[index];
			if (persona.codice === form.codice.value) {
				esiste = true;
				let code = document.querySelector('._code');
				let errore = document.querySelector('.errore');
				errore.innerHTML = '*Questo codice fiscale è gia presente in database';
				code.classList.add('_error');
				return false;
			}
			else {
				code.classList.remove('_error');
				errore.innerHTML = '';
			}
		}
	});
	/****************************************CHECK if it is not empty*******************************/
	for (let i = 0; i < req.length; i++) {
		let dati = req[i];
		if (dati.value == "") {
			errore.innerHTML = '*bisogna compilare tutti i campi';
			dati.classList.add('_error');
			return false;
		}
		else {
			dati.classList.remove('_error');
		}
	}
	if (!email_valid.test(mail.value)) {   //email validatio
		errore.innerHTML = '*mail non valido ';
		mail.classList.add('_error');
		return false;
	}
	else if (!code_valid.test(code.value)) { //codice fiscale validation
		errore.innerHTML = '*codice  non valido ';
		code.classList.add('_error');
		return false;
	}
	else {
		addGente();
		code.classList.remove('_error');
		mail.classList.remove('_error');

	}

	/*****************Creating Json +localStorage***************/
	function addGente() {
		let utente = {
			nome: document.getElementById('name').value,
			cognome: document.getElementById('cognome').value,
			codice: document.getElementById('codice').value,
			genere: document.getElementById("form").sesso.value,
			data: document.getElementById('data').value,
			eta: document.getElementById('eta').value,
			mansione: document.getElementById('role').value,
			mail: document.getElementById('email').value,
			password: document.getElementById('pass').value,
		}
		utenti.push(utente);
		$('#form')[0].reset(); 	//	RESET
		document.getElementById('eta').setAttribute('value', 0); //reset age
		console.warn('added', { utenti });
		errore.innerHTML = 'I dati sono stati salvati';//messagio 
		localStorage.setItem('persone', JSON.stringify(utenti));//localStorage
		reloadTable();

	}

}
//*********DELETE persone from locaStorage ***********/
function deletePersone(index) {
	let persone = window.localStorage.getItem('persone');
	personeObj = JSON.parse(persone);
	localStorage.removeItem('persone');
	personeObj.splice(index, 1);
	window.localStorage.setItem('persone', JSON.stringify(personeObj));
	document.querySelector("#newData").innerHTML = "";
		reloadTable();

}
/*************************Reload table*********** */
function reloadTable() {
	let persone = JSON.parse(localStorage.getItem('persone'));
	for (let i = 0; i < persone.length; i++) {
		let persona = persone[i];
		if (persona != null) {
			var table = document.querySelector("#newData");
			var row = `<tr>
			<td><button id="btn${i}" class ="delete" onclick="deletePersone(${i})"</button></td>
			 <td>${persona.nome}</td>
			 <td>${persona.cognome}</td>
			 <td>${persona.codice}</td>
			 <td><img id="im${i}" class="img"src="./img/support.png" onclick="popupOpen(${i})"></td>
		 </tr>`

		}

	}
	table.innerHTML += row;

}
/**************RESET Button***************/
const button = document.querySelector(".reset");
button.onclick = function () {
	document.getElementById('form').reset();
}


