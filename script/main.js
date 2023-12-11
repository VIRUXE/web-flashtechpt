/*
	Flávio Pereira
	https://github.com/VIRUXE
*/

import { GenerateFileServiceOptions } from "./file-service.mjs";

/*
	We load a random hero image. (50% chance)
	As we add or remove hero images we adjust the array below, with the image "id". Example: 'hero(id).webp'
*/
if (Math.random(1, 100) * 100 <= 50) { // We match the chance to load a random hero image
	const heroImages  = [1, 2, 3, 4].map(i => `./imagens/hero${i}.webp`);
	const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];  // Select a random image from the array

	// Make sure it actually exists before trying to use it. If not, it will just keep the default, hero.webp
	let image = new Image();
	image.src = randomImage;
	image.onload = () => document.getElementById("hero").style.backgroundImage = `url(${randomImage})`;
} else // Load the default hero image and set the background position
	document.getElementById("hero").style.backgroundImage = `url(./imagens/hero.webp)`;

// Show #whatsapp after 5 seconds
setTimeout(() => {
	const whatsapp = document.getElementById("whatsapp");

	whatsapp.style.display = "block";

	// Gradually increase the opacity of the element
	let opacity = 0;
	const interval = setInterval(() => {
		opacity += 0.1;
		whatsapp.style.opacity = opacity;
		if (opacity >= 1) clearInterval(interval);
	}, 200);
}, 1000);



const fileService             = document.getElementById('fileservice');
const fileServiceDetailsPanel = fileService.getElementsByTagName('div')[0];

function fileServiceMessage(message) {
	const messageElement = fileServiceDetailsPanel.getElementsByTagName('p')[0];

	messageElement.textContent   = message;
	messageElement.style.display = 'block';

	setTimeout(() => messageElement.style.display = 'none', 5000);
}

/* document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let textParam = `?text=Olá. Gostaria de obter um ficheiro.%0A`;

    Array.from(this.elements).forEach(element => {
        if (element.type === 'checkbox' && element.checked) {
            const label     = document.querySelector(`label[for="${element.id}"]`);
            const labelText = label ? label.textContent : 'Desconhecido';

            textParam += `%0A${labelText}`;
        } else if (element.type !== 'checkbox' && element.name && element.value)
            textParam += `${element.name}: ${element.value}%0A`;
    });

    window.open('https://wa.me/351919742986' + textParam, '_blank');
}); */


fileService.addEventListener('click', e => {
    if (
		e.target !== e.currentTarget ||
		e.target.id === 'fileservice-request'
	) return;

	let currDisplay = fileServiceDetailsPanel.style.display;

	fileServiceDetailsPanel.style.display = currDisplay === 'block' ? 'none' : 'block';
});

GenerateFileServiceOptions();