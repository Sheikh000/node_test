/**attendance.routes.ts */
import { Router } from 'express';
import AttendanceController from './attendance.controller';
class AttendanceRoute {
	public router: Router;

	attendanceController = new AttendanceController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post(
			'/attendance',
			this.attendanceController.createAttendance,
		);
		this.router.get('/absentees', this.attendanceController.getAttendance);
	}
}

export default new AttendanceRoute().router;
