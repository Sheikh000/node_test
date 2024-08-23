/**user.controller.ts */
import User from '../user/user.model';
import Student from './student.model';
import { createNewStudent, getStudentBydetail } from './student.DAL';
class StudentController {
	async createStudent(req, res, next) {
		try {
			const student = await createNewStudent(req.body);
			res.status(201).send(student);
		} catch (e) {
			res.send(e);
		}
	}
	async getStudents(req, res, next) {
		try {
			const students = await getStudentBydetail({});
			res.status(200).send(students);
		} catch (e) {
			res.send(e);
		}
	}
}
export default StudentController;
