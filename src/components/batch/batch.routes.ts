/**batch.routes.ts */
import { Router } from 'express';
import BatchController from './batch.controller';
import auth from '../../utils/auth';
import role from '../../utils/verifyRole';

class BatchRoute {
	public router: Router;
	batchController = new BatchController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.get('/batch', auth, this.batchController.getBatches);
		// Route to create a new batch
		this.router.post('/batch', auth, this.batchController.createBatch);
		// Route to add a branch to a batch for a specific year
		this.router.post('/batch/branch', auth, this.batchController.addBranch);
		this.router.delete(
			'/batch/:year',
			auth,
			this.batchController.deleteBatch,
		);
	}
}

export default new BatchRoute().router;
