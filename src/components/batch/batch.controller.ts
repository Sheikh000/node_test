/**batch controller.ts */
import Batch from './batch.model';
import Student from '../students/student.model';
import Attendance from '../attendance/attendance.model';
import { createNewBatch, deleteBatchByYear } from './batch.DAL';
import { USER_ROLE } from '../user/user.enum';
class BatchController {
	async createBatch(req, res, next) {
		try {
			if (req.user.role !== USER_ROLE.ADMIN) {
				return res.send({ message: 'Not authorized' });
			}
			const { year, branches } = req.body;
			const existingBatch = await Batch.findOne({ year });
			if (existingBatch) {
				return res.send({
					message: 'Batch for this year already exists',
				});
			}
			const batch = await createNewBatch({ year, branches });
			res.status(201).send(batch);
		} catch (e) {
			res.status(500).send(e);
		}
	}
	async addBranch(req, res, next) {
		try {
			if (req.user.role !== USER_ROLE.ADMIN) {
				return res.send({ message: 'Not authorized' });
			}
			const { year } = req.query;
			const { name, totalStudentsIntake } = req.body;

			if (!year) {
				return res.send({
					message: 'Year is required in query params',
				});
			}

			const batch = await Batch.findOne({ year });
			if (!batch) {
				return res
					.status(404)
					.send({ message: 'Batch not found for the given year' });
			}

			const branchExists = batch.branches.some(
				(branch) => branch.name === name,
			);
			if (branchExists) {
				return res
					.status(400)
					.send({ message: 'Branch already exists in the batch' });
			}

			batch.branches.push({ name, totalStudentsIntake });
			await batch.save();

			res.status(200).send(batch);
		} catch (e) {
			res.status(500).send(e);
		}
	}
	async deleteBatch(req, res, next) {
		try {
			if (req.user.role !== USER_ROLE.ADMIN) {
				return res.send({ message: 'Not authorized' });
			}
			const { year } = req.params;

			if (!year) {
				return res.send({
					message: 'Year is required',
				});
			}

			const deletedBatch = await deleteBatchByYear(year);
			if (!deletedBatch) {
				return res
					.status(404)
					.send({ message: 'Batch not found for the given year' });
			}
			await Student.deleteMany({ batch: deletedBatch.year });
			res.status(200).send({ message: 'Batch deleted successfully' });
		} catch (e) {
			res.status(500).send(e);
		}
	}
	async getBatches(req, res, next) {
		try {
			if (req.user.role !== USER_ROLE.ADMIN) {
				return res.send({ message: 'Not authorized' });
			}
			const batches = await Batch.find();
			res.status(200).send(batches);
		} catch (e) {
			res.status(500).send(e);
		}
	}
}

export default BatchController;
