/**user.model.ts */
import { Schema, model, Document } from 'mongoose';
import { USER_ROLE, DEPARTMENT } from './user.enum';
import * as bcrypt from 'bcrypt';
interface IUser extends Document {
	name: string;
	mobileNumber: string;
	password: string;
	department?: DEPARTMENT;
	role: USER_ROLE;
	tokens: { token: string }[];
	addToken: (token: string) => Promise<void>;
	comparePassword(password: string): Promise<boolean>;
}
const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
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
		password: {
			type: String,
			trim: true,
			minlength: [6, 'Password must be at least 6 characters long'],
			required: true,
		},
		department: {
			type: String,
			enum: DEPARTMENT,
			required: function () {
				return this.role === USER_ROLE.STAFF;
			},
		},
		role: {
			type: String,
			enum: USER_ROLE,
			required: true,
		},
		tokens: [{ token: { type: String, required: true } }],
	},
	{
		timestamps: true,
	},
);

userSchema.pre<IUser>('save', function (next) {
	if (this.role === USER_ROLE.ADMIN) {
		this.department = undefined;
	}
	next();
});
userSchema.pre('save', async function (next) {
	try {
		if (this.isModified('password')) {
			this.password = await bcrypt.hash(this.password, 10);
		}
		next();
	} catch (err) {
		next(err);
	}
});
userSchema.methods.addToken = async function (token: string) {
	this.tokens = this.tokens.concat({ token });
	await this.save();
};

userSchema.methods.comparePassword = async function (password: string) {
	return bcrypt.compare(password, this.password);
};
const User = model<IUser>('User', userSchema);
export default User;
