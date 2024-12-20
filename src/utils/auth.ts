//utils/auth.ts
import * as jwt from 'jsonwebtoken';
import User from '../components/user/user.model';
import { USER_ROLE } from '../components/user/user.enum';
export const generateToken = (userId: string): string => {
	return jwt.sign({ _id: userId }, process.env.JWT_SECRET);
};

const auth = async (req, res, next) => {
	try {
		const { role } = req.body;
		if (role === USER_ROLE.ADMIN) {
			next();
		} else {
			const token = req.headers['authorization']?.replace('Bearer ', '');
			if (!token) {
				return res
					.status(401)
					.send({ error: 'Please provide a token' });
			}
			const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
			const user = await User.findById(decoded._id);
			if (!user) {
				throw new Error('User not found');
			}
			req.token = token;
			req.user = user;
			next();
		}
	} catch (e) {
		res.status(401).send({
			error: 'Not authorized',
		});
	}
};

export default auth;
