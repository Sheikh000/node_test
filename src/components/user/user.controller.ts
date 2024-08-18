import { CreateNewUser } from './user.DAL';

class UserController {
	async createUser(req, res, next) {
		try {
			const user = await CreateNewUser(req.body);
			return res.status(201).send(user);
		} catch (e) {
			res.send(e);
		}
	}
}
export default UserController;
