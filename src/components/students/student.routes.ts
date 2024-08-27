/**student.routes.ts */
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
		this.router.get('/student', auth, this.studentController.getStudents);
		this.router.delete(
			'/student/:rollNumber',
			auth,
			this.studentController.deleteStudent,
		);
	}
}

export default new StudentRoute().router;
