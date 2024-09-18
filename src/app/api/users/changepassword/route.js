import { Connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

Connect()

export async function  POST(req) {
    try {
        const body = await req.json()
    const {password, token} = body
    const user = await User.findOne({frogotPasswordToken : token, forgotPasswordTokenExpire : {$gt : Date.now()}})
    if(!user){
        return NextResponse.json({error : "Password not changed"}, {status : 400})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    user.password = hashedPassword
    user.forgotPasswordTokenExpire = undefined
    user.frogotPasswordToken = undefined 
    await user.save();
    return NextResponse.json(
        { message: "Password Changed Successfully!!" },
        { status: 200 }
    )
        
    } catch (error) {
        return NextResponse.json(
            { message: "Password Cannot Change" },
            { status: 400 }
        )
    }
    
    
}