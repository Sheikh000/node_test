/**attendance.model.ts */
import mongoose, { Schema, model, Document } from 'mongoose';
import {ISABSENT} from './attendance.enum'
interface IAttendance extends Document{
    date:Date
    isAbsent:ISABSENT
    userId:Schema.Types.ObjectId
}
const attendanceSchema=new Schema<IAttendance>({
    date:{
        type:Date,
        required:true
    },
    isAbsent:{
        type:String,
        enum:ISABSENT,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})
const Attendance = model<IAttendance>('Attendance', attendanceSchema);
export default Attendance

