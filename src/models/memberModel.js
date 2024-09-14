import mongoose from "mongoose";

const memberSchems = new  mongoose.Schema({
    firstName : {type : String, required : true},
    lastName : { type : String, required : true},
    phoneNumber : { type : Number, required : true},
    email : { type : String, required: true},
    duration : { type : String, required : true},
    startDate : { type : Date, required : true, default : Date.now},
    endDate : {type : Date, require : true, default : Date.now},
    amount : { type :Number, required : true}
})

mongoose.models = {}

const Member = mongoose.model.member || mongoose.model("member", memberSchems)
export default Member
