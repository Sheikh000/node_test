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
		// Route to create a new batch
		this.router.post('/batch', auth, this.batchController.createBatch);
	}
}

export default new BatchRoute().router;
