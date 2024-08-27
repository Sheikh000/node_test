import Batch from '../batch/batch.model';
import Student from './student.model';
export async function checkSeat(
	department: string,
	batch: number,
): Promise<boolean> {
	try {
		const foundBatch = await Batch.findOne({ year: batch });
		if (!foundBatch) {
			throw new Error('Batch not found for the given year');
		}

		const branch = foundBatch.branches.find(
			(branch) => branch.name === department,
		);
		if (!branch) {
			throw new Error('Branch not found in the batch');
		}
		const studentCount = await Student.countDocuments({
			department,
			batch,
		});
		return studentCount < branch.totalStudentsIntake;
	} catch (e) {
        throw e
    }
}
