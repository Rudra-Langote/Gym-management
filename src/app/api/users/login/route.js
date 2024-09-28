import { Connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bycript from 'bcryptjs'
import  jwt  from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";


Connect();

export async function POST(req, res) {

    try {
        const body = await req.json();
        const { email, password } = body
        const existinguser = await User.findOne({ email })
        if (!existinguser) {
            return NextResponse.json({
                error: "User does not exist"
            },
                {
                    status: 400
                })
        }

        const check = await bycript.compare(password, existinguser.password);
        if (!check) {
            return NextResponse.json({
                error: "Wrong Credentials"
            },
            {
                status: 400
            })
        }
        else if(!existinguser.isVerified){
            await sendEmail({email: email, emailType: "VERIFY", userId: existinguser._id })
            return NextResponse.json({
                error: "User not vefied"
            },
            {
                status: 400
            })
        }

        const tokenData = {
            id: existinguser._id,
            email: existinguser.email,
            isAdmin : existinguser.isAdmin
        }
        const token = jwt.sign(tokenData, process.env.TOCAN_SECRET, { expiresIn: '5d' })
        const response = NextResponse.json({
            message: "Loggedin"
        },{
            status: 200
        });

        response.cookies.set("Token",token,{httpOnly:true})
        return response    




    } catch (error) {
        return NextResponse.json({
            error: error.message
        },
            {
                status: 500
            })
    }
}