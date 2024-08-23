/**user.controller.ts */
import User from '../user/user.model';
import Student from './student.model';
import {
	createNewStudent,
	deleteStudent,
	getStudentBydetail,
} from './student.DAL';
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
			if(!students){
				return res.send({message:"No students exists"})
			}
			res.status(200).send(students);
		} catch (e) {
			res.send(e);
		}
	}
	async deleteStudent(req, res, next) {
		try {
			const { rollNumber } = req.params.rollNumber;
			const deletedStudent = await deleteStudent(rollNumber);
			if(!deletedStudent){
				return res.send({message:"Student does not exists"})
			}
			res.send(deletedStudent);
		} catch (e) {
			res.send(e);
		}
	}
}
export default StudentController;
