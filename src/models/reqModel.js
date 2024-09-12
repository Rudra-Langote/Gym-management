import mongoose from "mongoose";

const reqSchems = new  mongoose.Schema({
    email : { type :String, required: true},
    duration : { type : String, required : true},
    amount : { type :Number, required : true},
    checked : { type : Boolean, default:true }
})

mongoose.models = {}

const Request = mongoose.model.request || mongoose.model("request", reqSchems)
export default Request
