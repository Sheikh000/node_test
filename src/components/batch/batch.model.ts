/**user.model.ts */
import { Schema, model, Document } from 'mongoose';
import { DEPARTMENT } from '../user/user.enum';
interface IBranch {
	name: string;
	totalStudentsIntake: number;
}
interface IBatch extends Document {
	year: number;
	branches: IBranch[];
}
const branchSchema = new Schema<IBranch>({
	name: {
		type: String,
		required: true,
		enum: DEPARTMENT,
	},
	totalStudentsIntake: {
		type: Number,
		required: true,
	},
});
const batchSchema = new Schema<IBatch>({
	year: {
		type: Number,
		required: true,
	},
	branches: [branchSchema],
});

const Batch = model<IBatch>('Batches', batchSchema);
export default Batch;
