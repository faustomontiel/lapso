import { model, Schema } from 'mongoose'

const userSchema: Schema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    } 

}, { timestamps: true })

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
  };
  

export default model<IUser>('User', userSchema);