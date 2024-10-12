import { jwtdata } from "@/helpers/jwtdata";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { Connect } from "@/dbConfig/dbconfig";

Connect()




export async function POST(req) {
    try {
        const data = jwtdata(req)
        const existingUser = await User.findOne({ email: data.email }).select("-__v").select("-_id").select("-phoneNumber").select("-email").select("-gender").select("-password").select("-address").select("-firstName").select("-lastName");
        return NextResponse.json({
            user: existingUser
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }
}
