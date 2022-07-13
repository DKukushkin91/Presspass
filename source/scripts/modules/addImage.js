export const addImage = () => {
	const imageInput = document.querySelector('.js-image-input');
	const imageName = document.querySelector('.js-image-name');

	const handleChangeLoadStatus = () => {
		const isImageInputEmpty = !imageInput.files.length;

		imageName.textContent = isImageInputEmpty ? 'Добавить изображение' : 'Файл успешно загружен';
	};

	handleChangeLoadStatus();

	imageInput.addEventListener('change', handleChangeLoadStatus);
};
