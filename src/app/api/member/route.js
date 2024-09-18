import { Connect } from "@/dbConfig/dbconfig";
import Member from "@/models/memberModel";

Connect()
export function GET(){
    return Member.members
}