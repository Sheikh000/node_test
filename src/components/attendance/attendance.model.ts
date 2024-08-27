/**attendance.model.ts */
import { Schema, model, Document } from 'mongoose';
import { ISABSENT } from './attendance.enum';
import * as moment from 'moment';
interface IAttendance extends Document {
	date: Date;
	isAbsent: ISABSENT;
	rollNumber: string;
}
const attendanceSchema = new Schema<IAttendance>({
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	isAbsent: {
		type: String,
		enum: ISABSENT,
		required: true,
	},
	rollNumber: {
		type: String,
		ref: 'User',
		required: true,
	},
});
attendanceSchema.pre('save', function (next) {
	const attendance = this;
	attendance.date = moment(attendance.date).startOf('day').toDate();
	next();
});

const Attendance = model<IAttendance>('Attendance', attendanceSchema);
export default Attendance;
