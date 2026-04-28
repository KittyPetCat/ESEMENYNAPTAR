document.addEventListener('DOMContentLoaded', function() {
	const form = document.querySelector('.login-form');
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const nev = form.querySelector('input[placeholder="nev"]').value.trim();
		const email = form.querySelector('input[placeholder="email"]').value.trim();
		const telefonszam = form.querySelector('input[placeholder="telefonszam"]').value.trim();
		const jelszo = form.querySelector('input[placeholder="jelszo"]').value;

		const data = {
			nev,
			email,
			telefonszam,
			jelszo
		};

		// Create JSON and trigger download
		const jsonStr = JSON.stringify(data, null, 2);
		const blob = new Blob([jsonStr], { type: 'application/json' });
		const a = document.createElement('a');
		const safeName = nev ? nev.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'adatok';
		a.href = URL.createObjectURL(blob);
		a.download = safeName + '.json';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(a.href);
	});
});
function belep() {
	window.location.href = "tomb_szerint/esemeny_tomb.html";
};
window.belep = belep;


