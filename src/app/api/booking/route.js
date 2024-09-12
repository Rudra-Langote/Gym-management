import { Connect } from "@/dbConfig/dbconfig";
import { jwtdata } from "@/helpers/jwtdata";
import Request from "@/models/reqModel";
import { NextResponse } from "next/server";

Connect()

export async function POST(req) {
    try {
        const body = await req.json()
        const { duration, amount} = body
        const data = jwtdata(req)
        const existingRequest = await Request.findOne({ email : data.email})
        if(existingRequest){
            return NextResponse.json({
                message : "Request already sent"
            },{
                status : 208
            })
        }
        console.log(data)
        const request = new Request({
            email : data.email,
            duration,
            amount

        })
        await request.save()

        

        return NextResponse.json({
            message : "Request sent"
        },{
            status : 200
        })

        
        
        
    } catch (error) {
        return NextResponse.json({
            error : error.message
        },{
            status : 500
        })
    }
    
}