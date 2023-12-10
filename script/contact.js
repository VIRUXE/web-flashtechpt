const whatsappBaseUrl = 'https://wa.me/351919742986';
const whatsappImg = document.createElement('img');
const emailImg = document.createElement('img');

with (whatsappImg) {
	src = 'logotipos/whatsapp.png';
	alt = 'WhatsApp';
	title = 'Enviar mensagem por WhatsApp'
	style.width = '50px';
	style.height = 'auto';
}

with (emailImg) {
	src = 'logotipos/email.png';
	alt = 'E-Mail';
	title = 'Preencher contacto de formulário.'
	style.width = '50px';
	style.height = 'auto';
	style.marginLeft = '1rem';
}

// Dialog handling
const dialog = document.getElementsByTagName('dialog')[0];

const serviceMessages = {
	ficheiros: 'Gostaria de obter um ficheiro',
	motores: 'Necessito de mais informação sobre reprogramação de motores',
	caixa_velocidaes: 'Necessito de mais informação sobre reprogramação de caixas de velocidades',
	filtro_particulas: 'Necessito de mais informação sobre filtros de partículas',
	potencia: 'Necessito de mais informação sobre aumentos de potência',
	egr: 'Necessito de mais informação sobre EGR',
	adblue: 'Necessito de mais informação sobre AdBlue',
	flaps: 'Necessito de mais informação sobre Flaps',
	catalizadores: 'Necessito de mais informação sobre Catalizadores'
}

function getGreeting() {
	const hour = new Date().getHours();

	if (hour >= 0 && hour < 12)
		return "Bom dia";
	else if (hour >= 12 && hour < 18)
		return "Boa tarde";
	else
		return "Boa noite";
}

function requestContact(service, data) {
	if(!Object.keys(serviceMessages).includes(service)) return;

	createContactLinks(service);
	dialog.showModal();
}

// Function to create the WhatsApp and Email links
function createContactLinks(service, type) {
	let dialogContent = document.querySelector('dialog > div:nth-child(2)');
	const text = `${getGreeting()}. ${serviceMessages[service]}`;

	// WhatsApp link
	let whatsappLink = document.createElement('a');
	whatsappLink.href = `${whatsappBaseUrl}?text=${text}.`;
	whatsappLink.appendChild(whatsappImg); // Replace with appropriate icons or images as needed
	whatsappLink.target = '_blank'; // Ensures the link opens in a new tab or window

	// Email link
	let emailLink = document.createElement('a');
	emailLink.href = 'mailto:example@example.com'; // Placeholder email address
	emailLink.appendChild(emailImg); // Replace with appropriate icons or images as needed
	emailLink.onclick = function () {
		// Replace the content of the second div with a contact form
		dialogContent.innerHTML = `
		<form action="contact-request.php" method="post">
		  <input type="email" name="email" placeholder="E-mail" required>
		  <textarea name="message" placeholder="A sua mensagem..." required>${text}</textarea>
		  <button type="submit">ENVIAR PEDIDO</button>
		</form>
	  `;
		return false; // Prevent default link behavior
	};

	// Add the links to the dialog content
	dialogContent.innerHTML = ''; // Clear the existing content
	dialogContent.appendChild(whatsappLink);
	dialogContent.appendChild(emailLink);
}

// Call the function to create the contact links when the dialog is opened
createContactLinks('ficheiros');
