import { jwtdata } from "@/helpers/jwtdata";
import { sendEmailForPaymentSuccess } from "@/helpers/paymentmail";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function POST(req) {
    try {

        const body = await req.json()
        const { amount } = body;
        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7)
        });


        return NextResponse.json({ orderId: order.id }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function PUT(req) {

    try {
        const body = await req.json()
        console.log(body)
        const { amount, duration, id , customerName, email } = body;

        const data = jwtdata(req)

        if (data && Object.keys(body).length === 3) {
            const existingUser = await User.findOne({ email: data.email });
            if (existingUser) {

                sendEmailForPaymentSuccess({ email: data.email, customerName: existingUser.firstName, membershipDuration: duration, amount: amount, paymentDate: Date.now(), transactionId: id, startDate: Date.now(), endDate: Date.now() + (2592000000 * duration) })
            }
        }
        else {
            sendEmailForPaymentSuccess({ email: email, customerName: customerName, membershipDuration: duration, amount: amount, paymentDate: Date.now(), transactionId: id, startDate: Date.now(), endDate: Date.now() + (2592000000 * duration) })

        }
        return NextResponse.json({ message: "Recipt sent to your email" }, { status: 200 })

    } catch (error) {

        return NextResponse.json({ error: error.message }, { status: 500 })


    }



}



