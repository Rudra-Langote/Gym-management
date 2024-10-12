import { jwtdata } from "@/helpers/jwtdata";
import Member from "@/models/memberModel";
import { NextResponse } from "next/server";
import { Connect } from "@/dbConfig/dbconfig";

Connect()




export async function POST(req) {
    try {
        const data = jwtdata(req)
        const existingMember = await Member.findOne({ email: data.email }).select("-__v").select("-_id").select("-phoneNumber").select("-email").select("-gender").select("-amount").select("-firstName").select("-lastName");
        return NextResponse.json({
            member: existingMember
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

export async function GET(){
    try {
        const Members = await Member.find()
        return NextResponse.json({
            member: Members
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