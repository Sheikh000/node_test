/**user.controller.ts */
import User from '../user/user.model';
import Student from './student.model';
import { CreateNewStudent } from './student.DAL';
class StudentController {
	async createStudent(req, res, next) {
		try {
			const student = await CreateNewStudent(req.body);
			res.status(201).send(student);
		} catch (e) {
			res.send(e);
		}
	}
}
export default StudentController;
