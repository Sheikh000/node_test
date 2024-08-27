/**student.controller.ts */
import User from '../user/user.model';
import Student from './student.model';
import { checkSeat, getStudentAnalyticsData } from './student.helper';
import {
	createNewStudent,
	deleteStudent,
	getStudentBydetail,
	updateStudent,
} from './student.DAL';
class StudentController {
	async createStudent(req, res, next) {
		try {
			const { department, batch } = req.body;
			const isSeatAvailable = await checkSeat(department, batch);
			if (!isSeatAvailable) {
				return res.send({
					message:
						'No seats available in the selected branch for this batch year',
				});
			}
			const student = await createNewStudent(req.body);
			res.status(201).send(student);
		} catch (e) {
			res.send({ message: e.message });
		}
	}
	async getStudents(req, res, next) {
		try {
			const students = await getStudentBydetail({});
			if (!students) {
				return res.send({ message: 'No students exists' });
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
			if (!deletedStudent) {
				return res.send({ message: 'Student does not exists' });
			}
			res.send(deletedStudent);
		} catch (e) {
			res.send(e);
		}
	}
	async getStudentAnalytics(req, res, next) {
		try {
			const analytics = await getStudentAnalyticsData();
			res.status(200).send(analytics);
		} catch (e) {
			res.status(500).send({ message: e.message });
		}
	}
	async updateStudent(req, res, next) {
		try {
			const { rollNumber } = req.params;
			const updateData = req.body;

			const updatedStudent = await updateStudent(rollNumber, updateData);
			if (!updatedStudent) {
				return res.status(404).send({ message: 'Student not found' });
			}

			res.status(200).send(updatedStudent);
		} catch (e) {
			res.status(500).send({ message: e.message });
		}
	}
}
export default StudentController;
