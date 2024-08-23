/**user.Dal.ts */
import Student from './student.model';

export async function CreateNewStudent(reqBody) {
	try {
		return await Student.create(reqBody);
	} catch (e) {
		return e;
	}
}
