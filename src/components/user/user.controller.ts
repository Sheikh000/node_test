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
			return res.status(201).send({ data: user,token });
		} catch (error) {
			res.send(error)
		}
	}
	async createStaff(req,res,next){
		try{
			const loggedInUserRole=req.user.role
			const {name,mobileNumber,rollNumber}=req.body
			if(loggedInUserRole!=="admin"){
				return res.send({message:"only admin can create Staff members"})
			}
			const existingStaff=await User.findOne({rollNumber,role:"staff"})

			if(existingStaff){
				return res.send({message:"Staff already Exists"})
			}
			const staff=await CreateNewUser(req.body)
			return res.status(201).send({data:staff})
		}catch(error){
			res.send(error)
		}
	}
	async logInAdmin(req, res, next) {
		try {
			const user = await User.findOne({name:req.body.name,role:"admin"});
			if (!user) {
			  return res.status(401).send({ error: 'Invalid credentials' });
			}
			const isPasswordValid = await user.comparePassword(req.body.password);
			if (!isPasswordValid) {
			  return res.status(401).send({ error: 'Invalid credentials' });
			}
			const token = generateToken(user?._id?.toString());
			await user.addToken(token);
			return res.status(200).send({ data: user, token });
		} catch (e) {
			res.send(e);
		}
	}
	async logInStaff(req,res,next){
		try{
			const user = await User.findOne({rollNumber:req.body.rollNumber,role:"staff"});
			if (!user) {
			  return res.status(401).send({ error: 'Invalid credentials' });
			}
			const isPasswordValid = await user.comparePassword(req.body.password);
			if (!isPasswordValid) {
			  return res.status(401).send({ error: 'Invalid credentials' });
			}
			const token = generateToken(user?._id?.toString());
			await user.addToken(token);
			return res.status(200).send({ data: user, token });
		}catch(e){
			res.send(e)
		}
	}
}
export default UserController;
