const whatsappBaseUrl       = 'https://wa.me/351919742986';
const whatsappImg           = document.createElement('img');
const emailImg              = document.createElement('img');
const contactRequestForm    = document.createElement('form');

contactRequestForm.id = 'contact-request';

with (whatsappImg) {
	src          = 'logotipos/whatsapp.png';
	alt          = 'WhatsApp';
	title        = 'Enviar mensagem por WhatsApp'
	style.width  = '50px';
	style.height = 'auto';
}

with (emailImg) {
	src              = 'logotipos/email.png';
	alt              = 'E-Mail';
	title            = 'Preencher contacto de formulário.'
	style.width      = '50px';
	style.height     = 'auto';
	style.marginLeft = '1rem';
	style.cursor     = 'pointer';
}

const serviceMessages = {
	ficheiros        : 'Gostaria de obter um ficheiro',
	motores          : 'Necessito de mais informação sobre reprogramação de motores',
	caixa_velocidades: 'Necessito de mais informação sobre reprogramação de caixas de velocidades',
	filtro_particulas: 'Necessito de mais informação sobre filtros de partículas',
	potencia         : 'Necessito de mais informação sobre aumentos de potência',
	egr              : 'Necessito de mais informação sobre EGR',
	adblue           : 'Necessito de mais informação sobre AdBlue',
	flaps            : 'Necessito de mais informação sobre Flaps',
	catalizadores    : 'Necessito de mais informação sobre Catalizadores'
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
	if (!Object.keys(serviceMessages).includes(service)) return;

	const dialogContent = document.querySelector('dialog > div:nth-child(2)');
	let text = `${getGreeting()}. ${serviceMessages[service]}.`;

	// Add extra details to the contact text if they're requesting a file service
	if (service === 'ficheiros') {
		text += 
			`\n\nModelo de Veículo: ${data.vehicleModel}` +
			`\nTipo de Motor: ${data.engineCode}` +
			`\n\nOpções Selecionadas: ${data.options.join(', ')}`;
	}

	// WhatsApp link
	let whatsappLink = document.createElement('a');
	whatsappLink.href = `${whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
	whatsappLink.appendChild(whatsappImg); // Replace with appropriate icons or images as needed
	whatsappLink.target = '_blank'; // Ensures the link opens in a new tab or window

	// Email link
	let emailLink = document.createElement('a');
	emailLink.appendChild(emailImg); // Replace with appropriate icons or images as needed
	emailLink.onclick = function () {
		// Clear existing content
		dialogContent.innerHTML      = '';
		contactRequestForm.innerHTML = '';

		// Create email input
		const emailLabel           = document.createElement('label');
		      emailLabel.htmlFor   = 'email';
		      emailLabel.innerHTML = '<b>E-mail</b>: ';

		const emailInput              = document.createElement('input');
		      emailInput.type         = 'email';
		      emailInput.id           = 'email';
		      emailInput.name         = 'email';
		      emailInput.placeholder  = 'nome@exemplo.pt';
		      emailInput.autocomplete = 'email';
		      emailInput.required     = true;

		const emailDiv = document.createElement('div');
		emailDiv.appendChild(emailLabel);
		emailDiv.appendChild(emailInput);

		// Create tel input
		const telLabel              = document.createElement('label');
		      telLabel.htmlFor      = 'tel';
		      telLabel.innerHTML    = '<b>Telemóvel</b>: ';
		const telInput              = document.createElement('input');
		      telInput.type         = 'tel';
		      telInput.id           = 'tel';
		      telInput.name         = 'tel';
		      telInput.placeholder  = '912999999';
		      telInput.autocomplete = 'tel';
		      telInput.required     = true;

		// Append tel elements to div
		const telDiv = document.createElement('div');
		telDiv.appendChild(telLabel);
		telDiv.appendChild(telInput);

		// Create textarea for message
		const messageLabel             = document.createElement('label');
		      messageLabel.htmlFor     = 'message';
		      messageLabel.innerHTML   = '<b>Mensagem de Contacto</b>:';
		const messageInput             = document.createElement('textarea');
		      messageInput.id          = 'message';
		      messageInput.name        = 'message';
		      messageInput.placeholder = 'A sua mensagem...';
		      messageInput.required    = true;
		      messageInput.value       = text;

		const responseMessage = document.createElement('div');
		responseMessage.id = 'response-message';

		// Create submit button
		const submitButton             = document.createElement('button');
		      submitButton.type        = 'submit';
		      submitButton.textContent = 'ENVIAR';
		      submitButton.onclick     = submitForm;

		// Append elements to form
		contactRequestForm.appendChild(emailDiv);
		contactRequestForm.appendChild(telDiv);
		contactRequestForm.appendChild(messageLabel);
		contactRequestForm.appendChild(messageInput);
		contactRequestForm.appendChild(responseMessage);
		contactRequestForm.appendChild(submitButton);

		// Append form and other elements to dialogContent
		dialogContent.appendChild(contactRequestForm);

		return false; // Prevent default link behavior
	};

	// Add the links to the dialog content
	dialogContent.innerHTML = ''; // Clear the existing content
	dialogContent.appendChild(whatsappLink);
	dialogContent.appendChild(emailLink);

	document.getElementsByTagName('dialog')[0].showModal();
}

function submitForm(event) {
	event.preventDefault();

	const responseElement = document.getElementById('response-message');

	const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');
    const currentTime = new Date().getTime();

    // Check if the form was submitted less than a certain time ago
    if (lastSubmissionTime && currentTime - lastSubmissionTime < 60000) { // 30 seconds threshold
        responseElement.textContent = 'Por favor, aguarde antes de enviar outro pedido.';
        return;
    }
	
	// Show the spinner first
	responseElement.innerHTML = `<div class="loader"></div>`;

	setTimeout(() => { // Yes a timeout...
		fetch('contact-request.php', {
			method: 'POST',
			body: new FormData(contactRequestForm),
		})
		.then(response => {
			if (!response.ok) {
				switch(response.status) {
					case 400:
						throw new Error('Erro no pedido. Por favor, verifique os dados que forneceu.'); // Bad Request
					case 500:
						throw new Error('Erro interno do servidor. Por favor, tente novamente mais tarde.'); // Server Error
					default:
						throw new Error('Problema de Rede. Tente mais tarde.');
				}
			}		
		})
		.then(() => {
			responseElement.textContent = 'Pedido enviado com sucesso!'
			localStorage.setItem('lastSubmissionTime', currentTime); // Update last submission time
		})
		.catch(error => {
			responseElement.textContent = error.message;
			console.log(error.message);
		});
	}, Math.random() * 1001); // Don't judge me ok?
};