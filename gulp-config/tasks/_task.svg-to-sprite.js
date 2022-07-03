import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import sprite from 'gulp-svgstore';
import browserSync from 'browser-sync';
import {DEVELOPMENT_ROUTE, PRODUCTION_ROUTE} from '../common/paths.js';

export const taskSvgToSprite = () => {
	return gulp.src(DEVELOPMENT_ROUTE.SVG_SPRITE)
		.pipe(imagemin([
				imagemin.svgo({
					plugins: [
						{removeViewBox: false},
						{cleanupIDs: false},
						{removeAttrs: {attrs: '(stroke|fill)'}},
					]
				})
			])
		)
		.pipe(sprite({
			mode: {
				stack: {
					sprite: '../sprite.svg'
				}
			}
		}))
		.pipe(gulp.dest(PRODUCTION_ROUTE.SVG))
		.pipe(browserSync.stream());
};
