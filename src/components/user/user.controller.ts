/**user.controller.ts */
import { CreateNewUser, GetUserByDetails, deleteUser } from './user.DAL';
import { generateToken } from '../../utils/auth';
import User from '../user/user.model';
import { USER_ROLE } from './user.enum';
class UserController {
	async createUser(req, res, next) {
		try {
			const { mobileNumber } = req.body;
			if(!req.user.tokens.length){
				return res.send({message:"Admin needs to login"})
			}
			const existingUser = await User.findOne({ mobileNumber });
			if (existingUser) {
				return res.send({ message: 'User already exists' });
			}
			const user = await CreateNewUser(req.body);
			const token = generateToken(user?._id?.toString());
			await user.addToken(token);
			res.status(201).send({ data: user, token });
		} catch (error) {
			res.send(error);
		}
	}
	async logInUser(req, res, next) {
		try {
			const { mobileNumber, password } = req.body;
			const user = await User.findOne({
				mobileNumber,
			});
			if (!user) {
				return res.status(401).send({ error: 'Invalid credentials' });
			}
			const isPasswordValid = await user.comparePassword(password);
			if (!isPasswordValid) {
				return res.status(401).send({ error: 'Invalid credentials' });
			}
			const token = generateToken(user?._id?.toString());
			await user.addToken(token);
			res.status(200).send({ data: user, token });
		} catch (e) {
			res.send(e);
		}
	}
	async getUsers(req, res, next) {
		try {
			const { role } = req.user;
			if (role === USER_ROLE.STAFF) {
				return res.send({ message: 'Not authorized' });
			}
			const users = await User.find();
			res.status(200).send({ data: users });
		} catch (e) {
			res.send(e);
		}
	}
	async deleteUser(req, res, next) {
		try {
			const { role } = req.user;
			const mobileNumber = req.params.mobileNumber;
			if (role === USER_ROLE.STAFF) {
				return res.send({ message: 'Only admin can delete User' });
			}
			const deletedUser = await deleteUser({ mobileNumber });
			if (!deletedUser) {
				return res.send({ message: 'User does not exists' });
			}
			res.send(deletedUser);
		} catch (e) {
			res.send(e);
		}
	}
	async logOutUser(req, res, next) {
		try {
			req.user.tokens = [];
			await req.user.save();
			res.send({ data: 'Succesfully logged out' });
		} catch (e) {
			res.send(e);
		}
	}
}
export default UserController;
