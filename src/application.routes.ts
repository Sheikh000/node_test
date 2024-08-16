/**application.routes.ts */
import { Application } from 'express';
import IndexRoute from './index';
export default class ApplicationConfig {
	static registerRoutes(app: Application) {
		app.use('/', IndexRoute);
	}
}
