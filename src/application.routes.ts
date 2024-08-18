/**application.routes.ts */
import { Application } from 'express';
import IndexRoute from './index';
import UserRoute from './components/user/user.routes';
export default class ApplicationConfig {
	static registerRoutes(app: Application) {
		app.use('/', IndexRoute);
		app.use('/', UserRoute);
	}
}
