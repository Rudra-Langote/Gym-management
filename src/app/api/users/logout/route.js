import { Connect } from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";

Connect();

export async function GET() {
    const response = NextResponse.json({
        message: "Loggedout"
    },{
        status: 200
    });

    response.cookies.set("Token","",{httpOnly:true, expires: new Date(0)})
    return response 

}