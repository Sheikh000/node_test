/**batch.DAL.ts */
import Batch from './batch.model';
export async function createNewBatch(reqBody) {
	try {
		return await Batch.create(reqBody);
	} catch (e) {
		return e;
	}
}
