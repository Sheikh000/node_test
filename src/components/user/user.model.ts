/**user.model.ts */
import { Schema, model, Document } from 'mongoose';
import { USER_ROLE, DEPARTMENT } from './user.enum';
interface IUser extends Document {
	name: string;
	rollNumber?:string;
	mobileNumber: string;
	password:string
	department: DEPARTMENT;
	batch?: number;
	currentSemester?: number;
	role: USER_ROLE;
}
const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
		trim:true,
	},
	rollNumber:{
		type:String,
		required:true,
		trim:true,
		unique:true
	},
	mobileNumber: {
		type: String,
		required: true,
		trim:true,
		validate: {
			validator: function (value: string) {
			  return /^[0-9]{10}$/.test(value);
			},
			message: "Phone number must be exactly 10 digits long.",
		  },
	},
	password:{
		type:String,
		required:true,
		trim: true,
		minlength: [6, 'Password must be at least 6 characters long'],
	},
	department: {
		type: String,
		enum: DEPARTMENT,
		required: true,
	},
	batch: {
		type: Number,
		required: function() { return this.role === USER_ROLE.STUDENT; },
	},
	currentSemester: {
		type: Number,
		required: function() { return this.role === USER_ROLE.STUDENT; },
	},
	role: {
		type: String,
		enum: USER_ROLE,
		required: true,
	},
});

userSchema.pre<IUser>('validate', function (next) {
	if ((this.role === USER_ROLE.ADMIN || this.role === USER_ROLE.STAFF) && (this.batch || this.currentSemester)) {
	  this.invalidate('batch', 'No need to provide batch for staff and admin.');
	  this.invalidate('currentSemester', 'No need to provide current semester for staff and admin.');
	}
	next();
  });

const User = model<IUser>('User', userSchema);
export default User;
