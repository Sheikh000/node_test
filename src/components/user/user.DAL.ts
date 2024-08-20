/**user.Dal.ts */
import User from './user.model';

export async function CreateNewUser(userBody) {
	try {
		return await User.create(userBody);
	} catch (e) {
		return e;
	}
}

export async function GetUserByDetails(userObj: any) {
	try {
		const user = await User.find({ ...userObj });
		return user;
	} catch (e) {
		return e;
	}
}
