/**attendancecontroller.ts */
import Attendance from './attendance.model';
import { addAttendance, getStudentAttendance } from './attendance.DAL';
import Student from '../students/student.model';
import * as moment from 'moment';
import { ISABSENT } from './attendance.enum';
class AttendanceController {
	async createAttendance(req, res, next) {
		try {
			const { rollNumber, date } = req.body;
			const student = await Student.findOne({ rollNumber });
			if (!student) {
				return res.send({ message: 'Student does not exists' });
			}
			const formattedDate = date
				? moment(date, 'DD-MM-YYYY').startOf('day').toDate()
				: moment().startOf('day').toDate();
			const existingAttendance = await Attendance.findOne({
				rollNumber,
				date: formattedDate,
			});

			if (existingAttendance) {
				return res
					.send({
						message: 'Attendance already recorded for this date',
					});
			}

			const attendance = await addAttendance({
				...req.body,
				date: formattedDate,
			});
			res.status(201).send(attendance);
		} catch (e) {
			res.send(e);
		}
	}

	async getAttendance(req, res, next) {
		try {
			const { date } = req.query;
            const formattedDate = moment(date, 'DD-MM-YYYY').startOf('day').toDate();
            const attendanceRecords = await Attendance.find({
                date: formattedDate,
				isAbsent:ISABSENT.ABSENT
            });
            if (!attendanceRecords.length) {
                return res.send({ message: 'No absent students found for this date' });
            }

            res.status(200).send(attendanceRecords);
		} catch (e) {
			res.status(500).send(e);

		}
	}
}
export default AttendanceController;
