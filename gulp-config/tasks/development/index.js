	import gulp from 'gulp';
import {taskVendorScriptsDevelopment} from './_task.vendor-scripts.development.js';
import {taskScriptsDevelopment} from './_task.scripts.development.js';
import {taskFontsConvertation} from '../_task.fonts-convertation.js';
import {taskFonts} from '../_task.fonts.js';
import {taskSvgToCss} from '../_task.svg-to-css.js';
import {taskVendorStylesDevelopment} from './_task.vendor-styles.development.js';
import {taskStylesDevelopment} from './_task.styles.development.js';
import {taskImagesOptimization} from '../_task.images-optimization.js';
import {taskImagesToWebp} from '../_task.images-to-webp.js';
import {taskSvgToSprite} from '../_task.svg-to-sprite.js';
import {taskPugConvertation} from '../_task.pug-convertation.js';

const tasksJsSeriesDevelopment = gulp.series(
	taskVendorScriptsDevelopment,
	taskScriptsDevelopment,
)

const tasksStylesSeriesDevelopment = gulp.series(
	taskFontsConvertation,
	taskFonts,
	taskSvgToCss,
	taskVendorStylesDevelopment,
	taskStylesDevelopment,
)

const tasksImagesSeriesDevelopment = gulp.series(
	taskImagesOptimization,
	taskImagesToWebp,
	taskSvgToSprite
)

const tasksLayoutSeriesDevelopment = gulp.series(
	tasksJsSeriesDevelopment,
	tasksStylesSeriesDevelopment,
	tasksImagesSeriesDevelopment,
	taskPugConvertation
)

export default tasksLayoutSeriesDevelopment;
