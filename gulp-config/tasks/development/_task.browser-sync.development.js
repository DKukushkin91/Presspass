import browserSync from "browser-sync";
import {PRODUCTION_ROUTE} from "../../common/paths.js";

export const taskBrowserSyncDevelopment = () => {
	browserSync.init({
		startPath: '/html/idea/',
		server: {
			baseDir: PRODUCTION_ROUTE.BUILD,
		},
		logPrefix: 'BS-HTML:',
		logLevel: 'info',
		logConnections: true,
		logFileChanges: true,
		open: true
	})
}
