import { Connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

Connect();

export async function POST(req, res) {
    try {
        const body = await req.json();
        const {Token} = body;
        const user = await User.findOne({verifiedToken : Token, verifiedTokenExpire : {$gt: Date.now()} })
        if(!user){
            return NextResponse.json({
                error: "Verification Faild"},
                {status: 400
            })
        }
        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verifiedTokenExpire = undefined;
        await user.save();
        return NextResponse.json({
            message: "Varification Successfull"},
            {status: 200
        })
        
    } catch (error) {
        return NextResponse.json({
            error: error.message},
            {status: 500
        })
    }
}