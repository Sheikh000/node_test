/**attendancecontroller.ts */
import Attendance from './attendance.model';
import { addAttendance, getStudentAttendance,updateAttendanceRecord } from './attendance.DAL';
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
			const formattedDate = moment(date, 'DD-MM-YYYY').toDate();
			const existingAttendance = await Attendance.findOne({
				rollNumber,
				date: formattedDate,
			});

			if (existingAttendance) {
				return res.send({
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
			const formattedDate = moment(date, 'DD-MM-YYYY').toDate();

			const attendanceRecords = await Attendance.find({
				date: formattedDate,
				isAbsent: ISABSENT.ABSENT,
			}).select('rollNumber');

			if (!attendanceRecords.length) {
				return res.send({
					message: 'No absent students found for this date',
				});
			}

			const rollNumbers = attendanceRecords.map(
				(record) => record.rollNumber,
			);

			const students = await Student.find({
				rollNumber: { $in: rollNumbers },
			});

			res.status(200).send(students);
		} catch (e) {
			res.status(500).send(e);
		}
	}

    async updateAttendance(req, res, next) {
        try {
            const { rollNumber } = req.params;
            const { date, isAbsent } = req.body;
			if (!date || !isAbsent) {
				return res.status(400).send({
				  message: 'Please provide both date and isAbsent',
				});
			  }
            const updatedAttendance = await updateAttendanceRecord(rollNumber, date, isAbsent);

            if (!updatedAttendance) {
                return res.status(404).send({
                    message: 'Attendance record not found for this student on the specified date',
                });
            }

            res.status(200).send(updatedAttendance);
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    }
}
export default AttendanceController;
