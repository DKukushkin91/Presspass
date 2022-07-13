export const DEVELOPMENT_ROUTE = {
	STYLES: 'source/styles/*.scss',
	VENDOR_STYLES: 'source/styles/vendor/*.css',
	SCRIPTS: 'source/scripts/app.js',
	JQUERY: 'source/scripts/jquery/*.js',
	VENDOR_SCRIPTS: 'source/scripts/vendor/*.js',
	LAYOUTS: 'source/layouts/pages/**/*.pug',
	IMAGES: 'source/images',
	RASTR_IMAGES: 'source/images/**/*',
	SVG: 'source/images/svg/**/*.svg',
	SVG_SPRITE: 'source/images/svg/sprite/*',
	SVG_CSS: 'source/images/svg/css/*',
	SVG_SPRITE_OUT: 'source/images/svg/',
	SVG_IN_CSS_IMAGES: 'source/images/svg/css/*.svg',
	SVG_OUT_CSS_IMAGES: 'source/styles/tools',
	FONTS: 'source/fonts/**/*.+(woff|woff2)',
	TTF_FONTS: 'source/fonts/*.ttf',
	LOCAL_FONTS: 'source/styles/settings/_settings.local-fonts.scss',
	FONTS_INIT: 'source/styles/settings/_settings.fonts.scss'
}

export const PRODUCTION_ROUTE = {
	BUILD: 'build/',
	STYLES: 'build/css/',
	SCRIPTS: 'build/scripts/',
	LAYOUTS: 'build/html/',
	IMAGES: 'build/images/',
	SVG: 'build/images/svg',
	RASTR_IMAGES: 'build/images/**/*',
	FONTS: 'build/fonts/',
}

export const WATCH_ROUTE = {
	LAYOUTS: 'source/**/*.pug',
	STYLES: 'source/styles/**/*.scss',
	SCRIPTS: 'source/scripts/**/*.js',
}
