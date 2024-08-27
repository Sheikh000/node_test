/**attendance.routes.ts */
import { Router } from 'express';
import AttendanceController from './attendance.controller';
import auth from '../../utils/auth';
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
			auth,
			this.attendanceController.createAttendance,
		);
		this.router.get(
			'/absentees',
			auth,
			this.attendanceController.getAttendance,
		);
		this.router.patch(
			'/attendance/:rollNumber',
			auth,
			this.attendanceController.updateAttendance,
		);
	}
}

export default new AttendanceRoute().router;
