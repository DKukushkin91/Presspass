import gulp from 'gulp';
import webpConv from 'gulp-webp';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import {PRODUCTION_ROUTE} from '../common/paths.js';

export const taskImagesToWebp = () => {
	return gulp.src(`${PRODUCTION_ROUTE.RASTR_IMAGES}.+(png|jpg|jpeg)`)
		.pipe(plumber())
		.pipe(changed(PRODUCTION_ROUTE.IMAGES, {
			extension: '.webp'
		}))
		.pipe(webpConv({lossless: true}))
		.pipe(gulp.dest(PRODUCTION_ROUTE.IMAGES))
		.pipe(browserSync.stream())
}
