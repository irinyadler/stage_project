let popup = document.getElementById("popup");
let popupContent = document.querySelector(".popup__content");
function popupOpen(i) {
	popup.classList.toggle("show");
	popupContent.classList.toggle("show");
	let persone = JSON.parse(localStorage.getItem('persone'));

	let text =
		`<p>${persone[i].nome}</p>  	
<p>${persone[i].cognome}</p>
<p>${persone[i].genere}</p>
<p>${persone[i].data}</p>
<p>${persone[i].eta}</p>
<p>${persone[i].mansione}</p>
<p>${persone[i].mail}</p>
<p>${persone[i].password}</p>`
	var popupT = document.querySelector(".popup__text");

	popupT.innerHTML = text;
}


function popupClose() {
	popup.classList.remove("show");
	popupContent.classList.remove("show");
}

