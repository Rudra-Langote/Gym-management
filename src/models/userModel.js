import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : { type : String, required : [true, "First name is required"]},
    lastName : { type : String, required : [true, "last name is required"]},
    age : { type : Number, required : [true, "Age is required"]},
    gender : {type : String, required : [true, "Gender is required"]},
    email : { type : String, required : [true, "Email name is required"], unique : [true, "This email allready exist"]},
    password : { type : String, required : [true, "Password is required"]},
    phoneNumber : { type : Number, required : [true, "Phone number is required"], unique :  [true, "This phone number allready exist"]},
    address : {type : String, required : [true, "Address is required"]},
    isVerified : { type : Boolean, default : false},
    isAdmin : { type : Boolean, default : false},
    frogotPasswordToken : String,
    forgotPasswordTokenExpire : Date,
    verifiedToken : String,
    verifiedTokenExpire : Date
})
mongoose.models = {}
const User = mongoose.model.users || mongoose.model("users", userSchema);
export default User;