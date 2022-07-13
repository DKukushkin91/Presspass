import {showSuccessModal} from './showSuccessModal.js';

export const ValidationForm = function () {
	this.shareIdeaForm = document.querySelector('.js-share-idea-form');
	this.inputs = this.shareIdeaForm.querySelectorAll('input');
	this.textarea = this.shareIdeaForm.querySelector('textarea');
	this.submitButton = this.shareIdeaForm.querySelector('.js-submit-button');
	this.inputCoordinates = this.shareIdeaForm.querySelector('.js-geolocation');
	this.address = document.querySelector('.js-address');
	this.inputImageName = document.querySelector('.js-image-name');
	this.validElements = [];
	this.bindEvents(this);
};

ValidationForm.prototype.handleSubmitForm = async function (data) {
	const instance = this;
	const URL = 'https://2a95da2a-ceab-4ca5-976f-403d0d1673ca.mock.pstmn.io/form';

	try {
		const formResponse = await fetch(URL, {
			method: 'POST',
			headers: new Headers(),
			body: JSON.stringify(data),
		});

		instance.shareIdeaForm.reset();
		instance.handleCheckValidation();
		instance.address.textContent = 'Указать геолокацию';
		instance.inputImageName.textContent = 'Добавить изображение';

		showSuccessModal();

		return formResponse.json();
	} catch (error) {
		console.error(`ОШИБКА`, error);
	}
};

ValidationForm.prototype.handleCheckValidation = function () {
	const instance = this;
	const collectionInputs = instance.inputs;
	const namesInput = [...collectionInputs].map(el => el['name']);
	const uniqueNamesInput = [...new Set(namesInput)];
	let validElements = [];

	for (let i = 0; i < collectionInputs.length; i++) {
		let input = collectionInputs[i];

		if ((input.type === 'text' && input.value.length) ||
			(input.type === 'radio' && input.checked) ||
			(input.type === 'file' && input.value) ||
			(input.type === 'checkbox' && input.checked)) {

			validElements.push({
				name: input['name'],
				value: input.value
			});
		}
	}

	if (instance.textarea.value.length) {
		validElements.push({name: instance.textarea['name'], value: instance.textarea.value});
	}

	if (validElements.length === uniqueNamesInput.length + 1) {
		instance.submitButton.removeAttribute('disabled');
	} else {
		instance.submitButton.setAttribute('disabled', 'disabled');
	}

	 instance.validElements = validElements;
};

ValidationForm.prototype.bindEvents = function () {
	const instance = this;

	instance.shareIdeaForm.reset();
	instance.handleCheckValidation();

	instance.shareIdeaForm.addEventListener('change', function () {
		instance.handleCheckValidation();
	});

	instance.shareIdeaForm.addEventListener('submit', function (evt) {
		evt.preventDefault();
		instance.handleSubmitForm(instance.validElements).then(resolved => resolved);
	});
};
