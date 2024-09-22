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

        const result = await Member.updateMany(
            { endDate: { $gte: today, $lt: new Date(today.getTime() + 86400000) } },
            { $set: { isMember: false } }
        );

        return NextResponse.json({
            message: result
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
        const body = req.json()
        const { email, duration } = body
        const dsd = Date.now() + (2592000000*duration)
        await Member.updateOne({ email }, {
            $set: {
                isMember: true,
                startDate: Date.now(),
                endDate: dsd
            }
        })
        return NextResponse.json({
            message: "Membership renewed"
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

