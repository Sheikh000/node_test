/**user.routes.ts */
import { Router } from 'express';
import UserController from './user.controller';
import auth from '../../utils/auth';
import role from '../../utils/verifyRole';
class UsersRoute {
	public router: Router;

	userController = new UserController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post(
			'/user/signup',
			auth,
			role,
			this.userController.createUser,
		);
		this.router.post('/user/login', this.userController.logInUser);
		this.router.get('/users', auth, this.userController.getUsers);
		this.router.delete(
			'/users/:mobileNumber',
			auth,
			this.userController.deleteUser,
		);
		this.router.post('/user/logOut', auth, this.userController.logOutUser);
	}
}

export default new UsersRoute().router;
