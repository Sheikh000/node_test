/**student.model.ts */
import { Schema, model, Document } from 'mongoose';
import { DEPARTMENT } from '../../components/user/user.enum';
interface IStudent extends Document {
	name: string;
	rollNumber: string;
	mobileNumber: string;
	department: DEPARTMENT;
	batch: number;
	currentSemester: number;
	role: string;
}
const studentSchema = new Schema<IStudent>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		rollNumber: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		mobileNumber: {
			type: String,
			required: true,
			trim: true,
			validate: {
				validator: function (value: string) {
					return /^[0-9]{10}$/.test(value);
				},
				message: 'Phone number must be exactly 10 digits long.',
			},
		},
		department: {
			enum: DEPARTMENT,
			type: String,
			required: true,
		},
		batch: {
			type: Number,
			required: true,
		},
		currentSemester: {
			type: Number,
			required: true,
		},
		role: {
			type: String,
			enum: ['student'],
			immutable: true,
		},
	},
	{
		timestamps: true,
	},
);

const Student = model<IStudent>('Student', studentSchema);
export default Student;
