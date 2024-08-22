import User from '../components/user/user.model';
import { USER_ROLE } from '../components/user/user.enum';
const role = async (req, res, next) => {
	try {
		const { role: newUserRole } = req.body;
		console.log(newUserRole)
		if (!req.user) {
			const count = await User.countDocuments({ role: 'admin' });
			if (count) {
				return res.send({ message: 'Admin already exists' });
			}
			next();
		}else{
			const loggedInUserRole = req.user.role;
			console.log(loggedInUserRole)
			if (loggedInUserRole === 'admin') {
				if (newUserRole !== 'staff' && newUserRole !== 'student') {
					return res.send({
						message: 'Admin can only create staff or students',
					});
				}
			} else if (loggedInUserRole === 'staff') {
				if (newUserRole !== 'student') {
					return res.send({ message: 'Staff can only create students' });
				}
			} else {
				return res.send({ message: 'Unauthorized to create this role' });
			}
			next()
		}

	} catch (e) {
		res.status(401).send({ error: 'Please authorize' });
	}
};

export default role;
