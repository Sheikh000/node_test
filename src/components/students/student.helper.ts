/**student helper.ts */
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
		throw e;
	}
}

export async function getStudentAnalyticsData() {
	try {
		const analytics = await Student.aggregate([
			{
				$group: {
					_id: {
						year: '$batch',
						branch: '$department',
					},
					totalStudents: { $sum: 1 },
				},
			},
			{
				$group: {
					_id: '$_id.year',
					totalStudents: { $sum: '$totalStudents' },
					branches: {
						$push: {
							k: '$_id.branch',
							v: '$totalStudents',
						},
					},
				},
			},
			{
				$project: {
					year: '$_id',
					totalStudents: 1,
					branches: { $arrayToObject: '$branches' },
				},
			},
			{
				$sort: { totalStudents: -1 },
			},
		]);

		return analytics;
	} catch (e) {
		throw new Error(
			`Error while getting student analytics data: ${e.message}`,
		);
	}
}
