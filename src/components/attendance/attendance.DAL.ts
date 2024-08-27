/**attendance.Dal.ts */
import Attendance from './attendance.model';
import * as moment from 'moment'
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

export async function updateAttendanceRecord(rollNumber: string, date: string, isAbsent: string) {
    try {
        const formattedDate = moment(date, 'DD-MM-YYYY').toDate();
        return await Attendance.findOneAndUpdate(
            { rollNumber, date: formattedDate },
            { isAbsent },
            { new: true,runValidators:true }
        );
    } catch (e) {
        throw new Error(`Error while updating attendance: ${e.message}`);
    }
}