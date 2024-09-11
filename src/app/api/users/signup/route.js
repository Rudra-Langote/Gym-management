import { Connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bycript from 'bcryptjs'
import { sendEmail } from "@/helper";

Connect();

export async function POST(req, res) {
    try {
        const body = await req.json();
        const { firstName, lastName, age, email, password, phoneNumber, address } = body
        console.log(body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                message: "User allready exiest"
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
            email,
            password: hashedPassword,
            phoneNumber,
            address
        });
        const saveUser = await newUser.save();
        await sendEmail({email: email, emailtype: "VERIFY", userId: saveUser._id })
        return NextResponse.json(
            { message: "Signup Successfully!!" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({
            error: error.message},
            {status: 500
        })
    }

}