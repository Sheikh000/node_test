/**user.model.ts */
import { Schema, model, Document } from 'mongoose';
import { DEPARTMENT } from '../user/user.enum';
interface IBatch extends Document {
	year: number;
	branches: [
		{
			name: DEPARTMENT;
			totalStudentsIntake: number;
		},
	];
}
const batchSchema = new Schema<IBatch>({
	year: {
		type: Number,
		required: true,
	},
	branches: [
		{
			name: {
				type: String,
				enum: DEPARTMENT,
				required: true,
			},
			totalStudentsIntake: {
				type: Number,
				required: true,
			},
		},
	],
});

const Batch = model<IBatch>('Batches', batchSchema);
export default Batch;
