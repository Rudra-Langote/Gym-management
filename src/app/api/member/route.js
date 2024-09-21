import { Connect } from "@/dbConfig/dbconfig";
import Member from "@/models/memberModel";
import { NextResponse } from "next/server";

Connect()


export async function DELETE(req) {
    try {
        const body = await req.json()
        const { email } = body
        await Member.findOneAndDelete({ email });
        return NextResponse.json({
            message : "Member removed"
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