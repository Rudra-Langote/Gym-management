import { Connect } from "@/dbConfig/dbconfig";
import { jwtdata } from "@/helpers/jwtdata";
import Member from "@/models/memberModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

Connect()



export async function PUT(req) {
    try {
      const body = await req.json(); // Get the request body
      let existingUser;
      
      // Case 1: If body contains only one key (assumed to be an email from JWT)
      if (Object.keys(body).length === 1) {
        // Assuming jwtdata(req) is a function that extracts and verifies JWT
        const data = jwtdata(req); // Extract JWT data
        if (!data || !data.email) {
          return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }
  
        console.log(data.email); // Debug log
  
        // Find user by email extracted from JWT
        existingUser = await User.findOne({ email: data.email });
  
        if (existingUser) {
          // Check for membership
          const existingMember = await Member.findOne({ email: existingUser.email });
          
          if (existingMember && existingMember.isMember === true) {
            return NextResponse.json({
              message: "You already have an active membership"
            }, { status: 208 });
          } else {
            return NextResponse.json({
              message: "Adding new member"
            }, { status: 200 });
          }
        } else {
          return NextResponse.json({
            error: "User not found"
          }, { status: 404 });
        }
      }
      
      // Case 2: Check if an email is provided directly in the body
      if (body.email) {
        const existingMember = await Member.findOne({ email: body.email });
  
        if (existingMember && existingMember.isMember === true) {
          return NextResponse.json({
            error: "You already have an active membership"
          }, { status: 208 });
        } else {
          return NextResponse.json({
            message: "Adding new member"
          }, { status: 200 });
        }
      }
  
      // Return an error if none of the cases match
      return NextResponse.json({
        error: "Invalid request"
      }, { status: 400 });
  
    } catch (error) {
      console.error("Error in PUT route:", error.message); // Log error for debugging
      return NextResponse.json({
        error: error.message
      }, { status: 500 });
    }
  }






export async function POST(req) {
    try {

        const body = await req.json()
        const { firstName, lastName, phoneNumber, email, gender, duration } = body
        console.log(body)
        var existingUser
        if (Object.keys(body).length === 1) {
            const data = jwtdata(req)
            console.log(data.email)
            existingUser = await User.findOne({ email: data.email });


        }



        if (existingUser) {

            try {
                const existingMember = await Member.findOne({ email: existingUser.email })
                if (existingMember) {

                    if (existingMember.isMember != true) {
                        try {
                            await Member.updateOne({ email: existingUser.email }, {
                                $set: {
                                    isMember: true,
                                    startDate: Date.now(),
                                    duration,
                                    endDate: Date.now() + (2592000000 * duration)
                                }
                            })
                            return NextResponse.json({
                                message: "Membership Booked Succesfully"
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
                    endDate: Date.now() + (2592000000 * duration),
                })
                await newMember.save()
                return NextResponse.json({
                    message: "Membership Booked"
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
                    if (existingMember.isMember != true) {
                        try {
                            await Member.updateOne({ email }, {
                                $set: {
                                    isMember: true,
                                    startDate: Date.now(),
                                    duration,
                                    endDate: Date.now() + (2592000000 * duration)
                                }
                            })
                            return NextResponse.json({
                                message: "Membership Booked Succesfully"
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
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    email: email,
                    gender: gender,
                    duration: duration,
                    endDate: Date.now() + (2592000000 * duration),
                })
                await newMember.save()
                return NextResponse.json({
                    message: "Membership Booked"
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