const showMap = () => {
	if (document.querySelector('.js-button-open-map')) {
		const body = document.querySelector('body');
		const buttonOpenMap = document.querySelector('.js-button-open-map');
		const geoLocation = document.querySelector('.js-geolocation');
		const address = document.querySelector('.js-address');
		const mapTemplate = document.querySelector('.js-yaMap-template')
			.content
			.querySelector('.js-yaMap');

		const initMap = () => {
			const yandexMap = new ymaps.Map('map', {
				center: [55.76, 37.64],
				zoom: 10,
				controls: ['searchControl', 'geolocationControl'],
			}, {
				suppressMapOpenBlock: true,
			});

			let myPlacemark;

			yandexMap.events.add('click', (evt) => {
				let coords = evt.get('coords');

				if (myPlacemark) {
					myPlacemark.geometry.setCoordinates(coords);
				} else {
					myPlacemark = createPlacemark(coords);
					yandexMap.geoObjects.add(myPlacemark);

					myPlacemark.events.add('dragend', function () {
						getAddress(myPlacemark.geometry.getCoordinates());
					});
				}

				getAddress(coords);
			});

			const createPlacemark = (coords) => {
				return new ymaps.Placemark(coords, {
					iconCaption: 'Поиск...'
				}, {
					preset: 'islands#blueDotIconWithCaption',
					draggable: true,
				});
			};

			const getAddress = (coords) => {
				myPlacemark.properties.set('iconCaption', 'Поиск...');

				ymaps.geocode(coords).then(async function (res) {
					const firstGeoObject = res.geoObjects.get(0);

					myPlacemark.properties
						.set({
							iconCaption: [
								firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
								firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
							].filter(Boolean).join(', '),
							balloonContent: firstGeoObject.getAddressLine()
						});

					address.textContent = firstGeoObject.getAddressLine();

					await setTimeout(() => {
						geoLocation.value = coords;
						handleRemoveMap();
					}, 1000);
				});
			};
		};

		const handlePressEscapeButton = (evt) => {
			if (evt.key === 'Escape') {
				evt.preventDefault();
				handleRemoveMap();
			}
		};

		const handleRemoveMap = () => {
			const map = document.querySelector('.js-yaMap');

			if (map) {
				map.remove();
			}

			document.removeEventListener('keydown', handlePressEscapeButton);
			body.classList.remove('lock-scroll');
		};

		const getMapTemplate = () => {
			const template = mapTemplate.cloneNode(true);
			const buttonCloseMap = template.querySelector('.js-button-close-map');

			buttonCloseMap.addEventListener('click', handleRemoveMap);

			ymaps.ready(initMap);

			return template;
		};

		const appendMapPopup = () => {
			const fragment = document.createDocumentFragment();
			const element = getMapTemplate();

			fragment.appendChild(element);
			body.appendChild(fragment);
		};

		buttonOpenMap.addEventListener('click', (evt) => {
			evt.preventDefault();

			if(evt.key !== 'Enter') {
				appendMapPopup();
			}

			document.addEventListener('keydown', handlePressEscapeButton);
			body.classList.add('lock-scroll');
		});
	}
};

const addImage = () => {
	const imageInput = document.querySelector('.js-image-input');
	const imageName = document.querySelector('.js-image-name');

	const handleChangeLoadStatus = () => {
		const isImageInputEmpty = !imageInput.files.length;

		imageName.textContent = isImageInputEmpty ? 'Добавить изображение' : 'Файл успешно загружен';
	};

	handleChangeLoadStatus();

	imageInput.addEventListener('change', handleChangeLoadStatus);
};

const showSuccessModal = () => {
		const body = document.querySelector('body');
		const mapTemplate = document.querySelector('.js-success-modal-template')
			.content
			.querySelector('.js-success-modal');

		const handlePressEscapeButton = (evt) => {
			if (evt.key === 'Escape') {
				evt.preventDefault();
				handleRemoveModal();
			}
		};

		const handleRemoveModal = () => {
			const modal = document.querySelector('.js-success-modal');

			if (modal) {
				modal.remove();
			}

			document.removeEventListener('keydown', handlePressEscapeButton);
			body.classList.remove('lock-scroll');
		};

		const getSuccessModalTemplate = () => {
			const template = mapTemplate.cloneNode(true);
			const buttonCloseModal = template.querySelector('.js-button-close-modal');

			buttonCloseModal.addEventListener('click', handleRemoveModal);

			return template;
		};

		const appendSuccessModal = () => {
			const fragment = document.createDocumentFragment();
			const element = getSuccessModalTemplate();

			fragment.appendChild(element);
			body.appendChild(fragment);

			document.addEventListener('keydown', handlePressEscapeButton);
			body.classList.add('lock-scroll');
		};

		appendSuccessModal();
};

const ValidationForm = function () {
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

document.addEventListener('DOMContentLoaded', () => {
	new ValidationForm;
	showMap();
	addImage();
});

//# sourceMappingURL=main.js.map
