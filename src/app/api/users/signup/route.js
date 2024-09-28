import { Connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bycript from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

Connect();

export async function POST(req, res) {
    try {
        const body = await req.json();
        const { firstName, lastName, age,gender, email, password, phoneNumber, address } = body
        console.log(body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                error: "User allready exiest"
            },
                {
                    status: 400
                });
        }
        const salt = await bycript.genSalt(10);
        const hashedPassword = await bycript.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            age,
            gender,
            email,
            password: hashedPassword,
            phoneNumber,
            address
        });
        const saveUser = await newUser.save();
        await sendEmail({email: email, emailType: "VERIFY", userId: saveUser._id })
        return NextResponse.json(
            { message: "Mail sent for verification" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({
            error: error.message},
            {status: 500
        })
    }

}