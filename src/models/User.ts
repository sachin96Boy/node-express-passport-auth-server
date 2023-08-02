import mongoose from "mongoose";

// Userinterface
interface User{
    name: string;
    email: string;
    password: string;
    date: Date;
}

// schema
const UserSchema = new mongoose.Schema<User>({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },

});

// model
const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;