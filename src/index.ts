/** Index.ts */
import { Router } from 'express';

class IndexRoute {
	public router: Router;
	constructor() {
		this.router = Router();
        this.initializeRoutes()
	}
	initializeRoutes(): void {
		this.router.get('/', (req, res) => {
			res.status(200).send('Running');
		});
	}
}
export default new IndexRoute().router;
