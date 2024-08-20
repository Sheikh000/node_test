/**user.controller.ts */
import { CreateNewUser, GetUserByDetails } from './user.DAL';
import { generateToken } from '../../utils/auth';
import User from '../user/user.model';
class UserController {
	async createAdmin(req, res, next) {
		try {
			const count = await User.countDocuments({ role: 'admin' });
			if (count) {
				return res.send({ message: 'admin already exist' });
			}
			if (req.body.role !== 'admin') {
				return res.send({ message: 'Only admin can signup' });
			}
			const user = await CreateNewUser(req.body);
			const token = generateToken(user?._id?.toString());
			await user.addToken(token);
			return res.status(201).send({ data: user, token });
		} catch (error) {
			return res.send(error);
		}
	}
	async createStaff(req, res, next) {
		try {
			const loggedInUserRole = req.user.role;
			const { role } = req.body;
			if (loggedInUserRole !== 'admin') {
				return res.send({
					message: 'only admin can create Staff members',
				});
			}
			if (role !== 'staff') {
				return res.send({ message: 'can only add Staff members' });
			}
			const staff = await CreateNewUser(req.body);
			return res.status(201).send({ data: staff });
		} catch (error) {
			return res.send(error);
		}
	}
	async logInAdmin(req, res, next) {
		try {
			const user = await User.findOne({
				name: req.body.name,
				role: 'admin',
			});
			if (!user) {
				return res.status(401).send({ error: 'Invalid credentials' });
			}
			const isPasswordValid = await user.comparePassword(
				req.body.password,
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
	async logInStaff(req, res, next) {
		try {
			const user = await User.findOne({
				rollNumber: req.body.rollNumber,
				role: 'staff',
			});
			if (!user) {
				return res.status(401).send({ error: 'Invalid credentials' });
			}
			const isPasswordValid = await user.comparePassword(
				req.body.password,
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
	async createStudent(req, res, next) {
		try {
			const role = req.user.role;
			if (role === 'student') {
				return res.send({ message: 'Not authorized to add students' });
			}
			if (req.body.role === 'admin' || req.body.role === 'staff') {
				return res.send({ message: 'Can only add students' });
			}
			const student = await CreateNewUser(req.body);
			return res.status(201).send({ data: student });
		} catch (e) {
			return res.send(e);
		}
	}
	async getUser(req, res, next) {
		try {
			const loggedInUserrole = req.user.role;
			const role = req.params.role;
			if (
				(loggedInUserrole === 'staff' && role === 'staff') ||
				(loggedInUserrole === 'staff' && role === 'admin')
			) {
				return res.send({
					message: 'Not authorized to view staff or admin',
				});
			}
			if (loggedInUserrole === 'student') {
				return res.send({
					message: 'Not authorized to view staff or admin',
				});
			}
			const user = await GetUserByDetails({ role });
			return res.send(user);
		} catch (e) {
			return res.send(e);
		}
	}
}
export default UserController;
