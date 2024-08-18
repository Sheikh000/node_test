import User from './user.model';

export async function CreateNewUser(userBody) {
	try {
		return await User.create(userBody);
	} catch (e) {
		return e;
	}
}
