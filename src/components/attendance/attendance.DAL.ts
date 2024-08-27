/**attendance.Dal.ts */
import Attendance from './attendance.model';

export async function addAttendance(reqBody) {
	try {
		return await Attendance.create(reqBody);
	} catch (e) {
		return e;
	}
}

export async function getStudentAttendance(obj: any) {
	try {
		const attendes = await Attendance.find(obj);
	} catch (e) {}
}
