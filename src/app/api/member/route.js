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
            message: "Member removed"
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

export async function POST(req) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await Member.updateMany(
            { endDate: { $gte: today, $lt: new Date(today.getTime() + 86400000) } },
            { $set: { isMember: false } }
        );

        return NextResponse.json({
            message : "Data Updated"
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
export async function PUT(req) {

    try {
        const body = await req.json()
        
        const { email, duration } = body
        await Member.updateOne({ email }, {
            $set: {
                isMember: true,
                startDate: Date.now(),
                duration,
                endDate: Date.now() + (2592000000 * duration)
            }
        })
        return NextResponse.json({
            message: "renewed"
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

