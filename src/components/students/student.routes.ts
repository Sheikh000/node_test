/**user.routes.ts */
import { Router } from 'express';
import StudentController from './student.controller';
import auth from '../../utils/auth';
import role from '../../utils/verifyRole';
class StudentRoute {
	public router: Router;

	studentController = new StudentController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post(
			'/student',
			auth,
			// role,
			this.studentController.createStudent,
		);
	}
}

export default new StudentRoute().router;
