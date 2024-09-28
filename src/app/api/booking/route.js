import { Connect } from "@/dbConfig/dbconfig";
import { jwtdata } from "@/helpers/jwtdata";
import Member from "@/models/memberModel";
import User from "@/models/userModel";
import axios from "axios";
import { NextResponse } from "next/server";

Connect()

export async function POST(req) {
    try {
        const body = await req.json()
        const { firstName, lastName, phoneNumber, email, gender, duration, amount } = body
        const data = jwtdata(req)
        const existingUser = await User.findOne({ email: data.email });


        console.log(existingUser)

        if (existingUser) {

            try {
                const existingMember = await Member.findOne({ email: existingUser.email })
                if (existingMember) {
                    if (existingMember.isMember == true) {
                        return NextResponse.json({
                            message: "You are already have an active membership"
                        }, {
                            status: 208
                        })
                    } else {
                        try {
                            await Member.updateOne({ email: existingMember.email }, {
                                $set: {
                                    isMember: true,
                                    startDate: Date.now(),
                                    duration,
                                    endDate: Date.now() + (2592000000 * duration)
                                }
                            })
                            return NextResponse.json({
                                message: "Successs"
                            }, {
                                status: 200
                            })
                        } catch (error) {
                            return NextResponse.json({
                                error: error.message
                            }, {
                                status: 400
                            })
                        }
                    }

                }
                const newMember = await new Member({
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    phoneNumber: existingUser.phoneNumber,
                    email: existingUser.email,
                    gender: existingUser.gender,
                    duration: duration,
                    amount: amount,
                    endDate: Date.now() + (2592000000 * duration),
                })
                await newMember.save()
                return NextResponse.json({
                    memberr: newMember
                }, {
                    status: 200
                })
            } catch (error) {
                return NextResponse.json({
                    message: error.message
                }, {
                    status: 500
                })
            }

        }
        else if (!existingUser) {
            try {
                const existingMember = await Member.findOne({ email })
                if (existingMember) {
                    if (existingMember.isMember == true) {
                        return NextResponse.json({
                            message: "You are already have an active membership"
                        }, {
                            status: 208
                        })
                    } else {
                        try {
                            await Member.updateOne({ email: existingMember.email }, {
                                $set: {
                                    isMember: true,
                                    startDate: Date.now(),
                                    duration,
                                    endDate: Date.now() + (2592000000 * duration)
                                }
                            })
                            return NextResponse.json({
                                message: "Sucsss 2"
                            }, {
                                status: 400
                            })
                        } catch (error) {
                            return NextResponse.json({
                                error: error.message
                            }, {
                                status: 400
                            })
                        }
                    }

                }
                const newMember = await new Member({
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    email: email,
                    gender: gender,
                    duration: duration,
                    endDate: Date.now() + (2592000000 * duration),
                    amount: amount
                })
                await newMember.save()
                return NextResponse.json({
                    memberrr: newMember
                }, {
                    status: 200
                })
            } catch (error) {
                return NextResponse.json({
                    message: error.message
                }, {
                    status: 500
                })
            }

        }




    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }

}