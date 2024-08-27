/**batch controller.ts */
import Batch from './batch.model';
import { createNewBatch } from './batch.DAL';
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
}

export default BatchController;
