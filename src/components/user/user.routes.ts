//user.routes.ts
import { Router } from 'express';
import UserController from './user.controller';

class UsersRoute {
	public router: Router;

	userController = new UserController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		// Sign Up
		this.router.post('/user', this.userController.createUser);
	}
}

export default new UsersRoute().router;
