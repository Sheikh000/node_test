/**user.routes.ts */
import { Router } from 'express';
import UserController from './user.controller';
import auth from '../../utils/auth'
class UsersRoute {
	public router: Router;

	userController = new UserController();

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	initializeRoutes() {
		this.router.post('/admin/signup', this.userController.createAdmin);//create admin
		this.router.post('/admin/login', this.userController.logInAdmin);//login admin
		this.router.post('/staff',auth,this.userController.createStaff);//create staff
		this.router.post('/staff/login',this.userController.logInStaff);//login staff
	}
}

export default new UsersRoute().router;
