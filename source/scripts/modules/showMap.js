export const showMap = () => {
	if (document.querySelector('.js-button-open-map')) {
		const body = document.querySelector('body');
		const buttonOpenMap = document.querySelector('.js-button-open-map');
		const geoLocation = document.querySelector('.js-geolocation');
		const address = document.querySelector('.js-address');
		const mapTemplate = document.querySelector('.js-yaMap-template')
			.content
			.querySelector('.js-yaMap')

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
