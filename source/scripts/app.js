import {showMap} from './modules/showMap';
import {addImage} from './modules/addImage';
import {ValidationForm} from './modules/validationForm';

document.addEventListener('DOMContentLoaded', () => {
	new ValidationForm;
	showMap();
	addImage();
});
