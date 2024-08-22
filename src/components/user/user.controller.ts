/**user.controller.ts */
import { CreateNewUser, GetUserByDetails } from './user.DAL';
import { generateToken } from '../../utils/auth';
import User from '../user/user.model';
class UserController {
	async createAdmin(req, res, next) {
		try {
			const user = await CreateNewUser(req.body);
			const token = generateToken(user?._id?.toString());
			await user.addToken(token);
			return res.status(201).send({ data: user, token });
		} catch (error) {
			return res.send(error);
		}
	}
	async logInUser(req, res, next) {
		try {
			const {mobileNumber,password}=req.body
			const user = await User.findOne({
				mobileNumber
			});
			if (!user) {
				return res.status(401).send({ error: 'Invalid credentials' });
			}
			const isPasswordValid = await user.comparePassword(
				password
			);
			if (!isPasswordValid) {
				return res.status(401).send({ error: 'Invalid credentials' });
			}
			const token = generateToken(user?._id?.toString());
			await user.addToken(token);
			return res.status(200).send({ data: user, token });
		} catch (e) {
			return res.send(e);
		}
	}
	// async getUser(req, res, next) {
	// 	try {
	// 		const loggedInUserrole = req.user.role;
	// 		const role = req.params.role;
	// 		if (
	// 			(loggedInUserrole === 'staff' && role === 'staff') ||
	// 			(loggedInUserrole === 'staff' && role === 'admin')
	// 		) {
	// 			return res.send({
	// 				message: 'Not authorized to view staff or admin',
	// 			});
	// 		}
	// 		if (loggedInUserrole === 'student') {
	// 			return res.send({
	// 				message: 'Not authorized to view staff or admin',
	// 			});
	// 		}
	// 		const user = await GetUserByDetails({ role });
	// 		return res.send(user);
	// 	} catch (e) {
	// 		return res.send(e);
	// 	}
	// }
}
export default UserController;
