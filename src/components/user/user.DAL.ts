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

export async function deleteUser(userMobileNumber) {
	try {
		const deletedUser = await User.findOneAndDelete(userMobileNumber);
		return deletedUser;
	} catch (e) {
		return e;
	}
}

export async function updateuserDetails(
	mobileNumber: string,
	updateDetails: any,
) {
	try {
		const updateUser = await User.findOneAndUpdate(
			{ mobileNumber },
			{ $set: updateDetails },
			{ new: true, runValidators: true },
		);
		return updateUser;
	} catch (e) {
		return e;
	}
}
