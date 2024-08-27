/**student.Dal.ts */
import Student from './student.model';

export async function createNewStudent(reqBody) {
	try {
		return await Student.create(reqBody);
	} catch (e) {
		return e;
	}
}

export async function getStudentBydetail(obj: any) {
	try {
		return await Student.find({ ...obj });
	} catch (e) {
		return e;
	}
}

export async function deleteStudent(studentRollNumber) {
	try {
		const deletedStudent =
			await Student.findOneAndDelete(studentRollNumber);
		return deletedStudent;
	} catch (e) {
		return e;
	}
}
