/*
	Flávio Pereira
	https://github.com/VIRUXE
*/

import { getOptionDescription, renderOptions as renderFileServiceOptions } from "./file-service-options.mjs";

/*
	Load a random hero image. (50% chance)
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

// Show #whatsapp (Image in the bottom right corner) after 5 seconds
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

/*
	File service handling
	? This should be moved somewhere else...
*/
const fileService             = document.getElementById('fileservice');
const fileServiceDetailsPanel = fileService.getElementsByTagName('div')[0];

function fileServiceMessage(message) {
	const messageElement = fileServiceDetailsPanel.getElementsByTagName('p')[0];

	messageElement.textContent   = message;
	messageElement.style.display = 'block';

	setTimeout(() => messageElement.style.display = 'none', 5000);
}

// Handle file service form submitting
document.querySelector('#fileservice div form').addEventListener('submit', function(event) {
    event.preventDefault();

	// Gather checked options
	const checkedOptions = Array.from(this.elements).filter(element => element.type === 'checkbox' && element.checked)
	
    if(checkedOptions.length)
		requestContact('ficheiros', {
			vehicleModel: this.elements.vehicleModel.value,
			engineCode  : this.elements.engineCode.value,
			options     : [...checkedOptions.map(option => getOptionDescription(option.id))]
		});
	else
		fileServiceMessage('Tem que selecionar pelo menos uma opção.');
});

// Open/close file service details panel on the file service section
fileService.addEventListener('click', e => {
    const excludedDiv = fileService.querySelector('div:first-of-type');

    // Check if the clicked target is a child of the excluded div but not the div itself
    if (e.target !== fileService && (e.target === excludedDiv || excludedDiv.contains(e.target))) return;

    fileServiceDetailsPanel.style.display = fileServiceDetailsPanel.style.display === 'block' ? 'none' : 'block';
});

renderFileServiceOptions();