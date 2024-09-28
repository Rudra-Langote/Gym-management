import { Connect } from "@/dbConfig/dbconfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextResponse } from "next/server";


Connect()

export async function POST(req) {
    try {
        const body = await req.json()
        const {email} = body
        const user = await User.findOne({email})
        console.log(user)
        await sendEmail({ email, emailType : "FORGOT", userId : user._id})
        return NextResponse.json(
            { message: "Mail Sent Successfully!!" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Failed" },
            { status: 500 }
        )
    }
    
}


