/**user.model.ts */
import { Schema, model, Document } from 'mongoose';
import { USER_ROLE, DEPARTMENT } from './user.enum';
interface IUser extends Document {
	name: string;
	mobileNumber: number;
	department: DEPARTMENT;
	batch?: number;
	currentSemester?: number;
	role: USER_ROLE;
}
const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	mobileNumber: {
		type: Number,
		required: true,
		min: 10,
		max: 10,
	},
	department: {
		type: String,
		enum: DEPARTMENT,
		required: true,
	},
	batch: {
		type: Number,
	},
	currentSemester: {
		type: Number,
	},
	role: {
		type: String,
		enum: USER_ROLE,
		required: true,
	},
});

const User = model<IUser>('User', userSchema);
export default User;
