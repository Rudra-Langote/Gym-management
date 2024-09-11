import { Connect } from "@/dbConfig/dbconfig";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
Connect()

export async function POST(req) {
    try {
        
        
        
    } catch (error) {
        return NextResponse.json({
            error : error.message
        },{
            status : 500
        })
    }
    
}