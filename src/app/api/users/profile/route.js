import { Connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { jwtdata } from "@/helpers/jwtdata";
import { NextResponse } from "next/server";

Connect()

export async function POST(req) {
    try {
        const data = jwtdata(req)
        const existingUser = await User.findOne({ email: data.email }).select("-password");
        return NextResponse.json({
            user: existingUser
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            error : error.message
        }, {
            status: 500
        })
    }
}

export async function PUT(req) {
    try {
        const data = jwtdata(req)
        const body = await req.json();
        const { firstName, lastName, age,gender, phoneNumber, address } = body

        return NextResponse.json({
            user: updatedUser
        }, {
            status: 200
        })

        
    } catch (error) {
        return NextResponse.json({
            error : error.message
        }, {
            status: 500
        })
    }
}
