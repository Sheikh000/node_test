/**application.routes.ts */
import { Application } from 'express';
import IndexRoute from './index';
import UserRoute from './components/user/user.routes';
import StudentRoute from './components/students/student.routes';
import attendanceRoute from './components/attendance/attendance.routes';
export default class ApplicationConfig {
	static registerRoutes(app: Application) {
		app.use('/', IndexRoute);
		app.use('/', UserRoute);
		app.use('/', StudentRoute);
		app.use('/', attendanceRoute);
	}
}
