import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json();

        const email = reqbody.email;
        const password = reqbody.password;

        if (!email.endsWith("@cea.gov.in")) {
          return  NextResponse.json(
            ({
              success: false,
              message: "Only CEA institutional emails are allowed",
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        console.log(email,password);
        

        // const user = await User.findOne({ email });

        const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, "i") } 
    });

        if (user) {
            console.log("user already exit");
            
          return NextResponse.json(
            { error: "User already Exist" },
            { status: 400 }
          );
        }

        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        
        

        const newUser=new User({
            email : email,
            password: hashedPassword,
        })

        // console.log(newUser);
        
        //now save the new user in the data base

        const savedUser=await newUser.save();

        console.log("new user created successfully");
        console.log(savedUser);
        

        return NextResponse.json({
            message:"user created successfully",
            success:true,
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json("signup failed",error);
    }

    
}