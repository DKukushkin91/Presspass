export const showSuccessModal = () => {
		const body = document.querySelector('body');
		const mapTemplate = document.querySelector('.js-success-modal-template')
			.content
			.querySelector('.js-success-modal')

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
